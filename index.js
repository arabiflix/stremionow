const axios = require('axios');
const parser = require('fast-html-parser');
const Host = 'https://wecima.click';

const client = axios.create({
  timeout: 4000,
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0"
  }
});

async function search(type, query) {
  try {
      let URL;
      let link;
      if (type === 'movie') {
          URL = `${Host}/search/${query.replace(/\s/g, '+')}`;
          link = encodeURI(URL);
      } else if (type === 'series') {
          URL = `${Host}/search/${query.replace(/\s/g, '+')}/list/series/`;
          link = encodeURI(URL);
      }

      const promise = await client.get(link);
      const parsed = parser.parse(promise.data).querySelector('.Grid--MycimaPosts').querySelectorAll('.GridItem');

      return parsed.map((movie) => {
          if (movie) {
              const cat = {
                  id: movie.querySelector('a').rawAttributes['href'].toString(),
                  type: type,
                  title: movie.querySelector('a').rawAttributes['title'].toString(),
                  poster: movie.querySelector('.BG--GridItem').rawAttributes['data-lazy-style'].replace(/\(|\)|;|--image:url/g, ''),
              };
              if (movie.querySelector('.year')) {
                  cat.released = movie.querySelector('.year').rawText.toString();
              }
              return cat;
          }
      });
  } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to be caught by the calling function
  }
}

async function catalog(type, id, extra) {
  try {
      let URL;
      if (type === 'movie') {
          if (id === "MCmovies") {
              URL = `${Host}/movies/top/`;
              if (extra === "New") {
                  URL = `${Host}/movies/`;
              } else if (extra === "Old") {
                  URL = `${Host}/movies/old/`;
              } else if (extra === "Best") {
                  URL = `${Host}/movies/best/`
              }
          } else if (id === "MCmovies-Arabic") {
              URL = `${Host}/category/افلام/6-arabic-movies-افلام-عربي/list/top/`;
              if (extra === "New") {
                  URL = `${Host}/category/افلام/6-arabic-movies-افلام-عربي/`;
              } else if (extra === "Old") {
                  URL = `${Host}/category/افلام/6-arabic-movies-افلام-عربي/list/old/`;
              } else if (extra === "Best") {
                  URL = `${Host}/category/افلام/6-arabic-movies-افلام-عربي/list/best/`
              }
          }
              else if (id === "MCmovies-English") {
                URL = `${Host}/category/افلام/10-movies-english-افلام-اجنبي/list/top/`;
                if (extra === "New") {
                    URL = `${Host}/category/افلام/10-movies-english-افلام-اجنبي/`;
                } else if (extra === "Old") {
                    URL = `${Host}/category/افلام/10-movies-english-افلام-اجنبي/list/old/`;
                } else if (extra === "Best") {
                    URL = `${Host}/category/افلام/10-movies-english-افلام-اجنبي/list/best/`
                }
            }
              else if (id === "MCmovies-Indian") {
                URL = `${Host}/category/افلام/افلام-هندي-indian-movies/list/top/`;
                if (extra === "New") {
                    URL = `${Host}/category/افلام/افلام-هندي-indian-movies/`;
                } else if (extra === "Old") {
                    URL = `${Host}/category/افلام/افلام-هندي-indian-movies/list/old/`;
                } else if (extra === "Best") {
                    URL = `${Host}/category/افلام/افلام-هندي-indian-movies/list/best/`
                }
            }
              else if (id === "MCmovies-Turkish") {
                URL = `${Host}/category/افلام/افلام-تركى-turkish-films/list/top/`;
                if (extra === "New") {
                    URL = `${Host}/category/افلام/افلام-تركى-turkish-films/`;
                } else if (extra === "Old") {
                    URL = `${Host}/category/افلام/افلام-تركى-turkish-films/list/old/`;
                } else if (extra === "Best") {
                    URL = `${Host}/category/افلام/افلام-تركى-turkish-films/list/best/`
                }
            }
    
    } else if (type === 'series') {
      if (id === "MCseries") {
        URL = `${Host}/seriestv/top`;
        if (extra === "New") {
            URL = `${Host}/seriestv/new/`;
        } else if (extra === "Old") {
            URL = `${Host}/seriestv/old`;
        } else if (extra === "Best") {
            URL = `${Host}/seriestv/best/`
        }
    }
    else if (id === "MCseries-Arabic") {
        URL = `${Host}/category/مسلسلات/13-مسلسلات-عربيه-arabic-series/list/`;
    }
    else if (id === "MCseries-English") {
        URL = `${Host}/category/مسلسلات/5-series-english-مسلسلات-اجنبي/list/`;
    }
    else if (id === "MCseries-Indian") {
        URL = `${Host}/category/مسلسلات/9-series-indian-مسلسلات-هندية/list/`;
    }
    else if (id === "MCseries-Turkish") {
        URL = `${Host}/category/مسلسلات/8-مسلسلات-تركية-turkish-series/list/`;
    }
    else if (id === "MCseries-Asian") {
        URL = `${Host}/category/مسلسلات/مسلسلات-اسيوية/list/`;
    }
    }

    const res = encodeURI(URL);
        const promise = await client.get(res);
        const parsed = parser.parse(promise.data).querySelector('.Grid--MycimaPosts').querySelectorAll('.GridItem');

        return parsed.map((movie) => {
            const cat = {
                id: movie.querySelector('a').rawAttributes['href'].toString(),
                type: type,
                name: movie.querySelector('a').querySelector('.hasyear').rawText.toString(),
                poster: movie.querySelector('.BG--GridItem').rawAttributes['data-lazy-style'].replace(/\(|\)|;|--image:url/g, ''),
            };

            if (movie.querySelector('.hasyear')) {
                cat.releaseInfo = movie.querySelector('.year').rawText.toString();
            }
            return cat;
        });
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

async function meta(type, id) {
  try {
    let URL = id;
    let res = encodeURI(URL);
    let promise = (await client.get(res)).data;
    let link = res;

    try {
      promise = (await client.get(link)).data;
    } catch (error) {
      console.log(error);
    }

    let parsed = parser.parse(promise);

    let description;
    let bg;

    let title = parsed.querySelector('.Title--Content--Single-begin').querySelector('h1').rawText.toString();
    if (type == 'movie') {
      description = parsed.querySelector('.StoryMovieContent').rawText.toString();
      bg = parsed.querySelector('.separated--top').rawAttributes['data-lazy-style'].toString().replace(/\(|\)|;|--img:url/g, '');
    }
    if (type == 'series') {
      description = parsed.querySelector('.PostItemContent').rawText.toString();
      bg = parsed.querySelector('.separated--top').rawAttributes['style'].toString().replace(/\(|\)|;|--img:url/g, '');
    }

    let year = parsed.querySelector('.Title--Content--Single-begin').querySelector('h1').querySelector('a').rawText.toString();

    let genres = parsed.querySelector('.Terms--Content--Single-begin').querySelectorAll('a')
      .map((genre) => {
        return genre.rawText.toString();
      });

    let genre = [];

    genre = genres.filter((elem) => {
      return elem !== undefined;
    });

    let metaObj = {
      id: id,
      name: title,
      posterShape: 'poster',
      type: type,
      poster: bg,
      background: bg,
      description: description,
    };

    if (genre) {
      metaObj.genre = genre;
    }
    if (year) {
      metaObj.releaseInfo = year;
    }

    if (type == 'series') {
      var seasons = await seasonlist(id);
    }
    if (type == 'series') {
      if (seasons) {
        metaObj.videos = seasons;
      }
    }

    return metaObj;
  } catch (error) {
    console.error('Error in meta:', error);
    return {};
  }
}

async function seasonlist(id) {
  try {
    let URL = id;
    let res = encodeURI(URL);
    let promise = (await client.get(res)).data;
    let link = res;

    try {
      promise = (await client.get(link)).data;
    } catch (error) {
      console.log(error);
    }

    let parsed = parser.parse(promise);
    let seasonsEpisodes = parsed.querySelector('.Seasons--Episodes');
    let seasonarray = [];

    try {
      if (seasonsEpisodes.querySelector('.List--Seasons--Episodes')) {
        let seasonsList = seasonsEpisodes.querySelector('.List--Seasons--Episodes').querySelectorAll('a');

        for (let i = 0; i < seasonsList.length; i++) {
          let seasonUrl = seasonsList[i].rawAttributes['href'];
          let seasonData = (await client.get(seasonUrl)).data;

          let pars = parser.parse(seasonData);
          let eplist = pars.querySelector('.Episodes--Seasons--Episodes').querySelectorAll('a');

          eplist.reverse();

          for (let j = 0; j < eplist.length; j++) {
            let epUrl = eplist[j].rawAttributes['href'];
            let epData = (await client.get(epUrl)).data;
            let edDataParsed = parser.parse(epData);

            let epTitle = edDataParsed.querySelector('.Title--Content--Single-begin').querySelector('h1').rawText.toString();

            seasonarray.push({
              id: epUrl,
              name: epTitle,
              season: i + 1,
              episode: j + 1,
              available: true
            });
          }
        }
      } else if (!seasonsList) {
        let eplist = parsed.querySelector('.Episodes--Seasons--Episodes').querySelectorAll('a');

        eplist.reverse();

        for (let j = 0; j < eplist.length; j++) {
          let epUrl = eplist[j].rawAttributes['href'];
          let epData = (await client.get(epUrl)).data;
          let edDataParsed = parser.parse(epData);

          let epTitle = edDataParsed.querySelector('.Title--Content--Single-begin').querySelector('h1').rawText.toString();

          seasonarray.push({
            id: epUrl,
            name: epTitle,
            season: 1,
            episode: j + 1,
            released: '2010-12-06T05:00:00.000Z',
            available: true
          });
        }
      }
    } catch (error) {
      console.log(error);
    }

    return seasonarray;
  } catch (error) {
    console.error('Error in seasonlist:', error);
    return [];
  }
}

async function stream(type, id) {
  try {
    let URL = id;
    let res = encodeURI(URL);
    let promise = (await client.get(res)).data;
    let link = res;

    try {
      promise = (await client.get(link)).data;
    } catch (error) {
      console.log(error);
    }

    let parsed = parser.parse(promise).querySelector('.List--Download--Mycima--Single').querySelectorAll('a');

    let streamList = parsed.map(stream => {
      return {
        url: stream.rawAttributes['href'],
        name: stream.querySelector('resolution').rawText
      };
    });

    return streamList;
  } catch (error) {
    console.error('Error in stream:', error);
    return [];
  }
}

module.exports = {
  search,
  catalog,
  meta,
  stream
};
