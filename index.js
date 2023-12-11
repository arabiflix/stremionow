const axios = require('axios');
const parser = require('fast-html-parser');
const Host = 'https://cimanow.cc';


client = axios.create({
            timeout: 4000,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0"
            }
        });


async function search(type, query) {

    if (type === 'movie') {
        try {
            var URL = `${Host}/?s=${query.replace(/\s/g, '+')}`;
            var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            var link = res;
        }catch(error) {
            try {
                var promise = (await client.get(URL)).data;
                var link = URL;
            }catch(error) {
                console.log(error);
            }
        }
    }
    else if (type === 'series'){
        try {
            var URL = `${Host}/?s=${query.replace(/\s/g, '+')}`;
            var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            var link = res;
        }catch(error) {
            try {
                var promise = (await client.get(URL)).data;
                var link = URL;
            }catch(error) {
                console.log(error);
            }
        }
        
    }

    try {
        var promise = (await client.get(link)).data;
    }catch (error) {
        console.log(error);
    }    

    let parsed = parser.parse(promise).querySelector('section').querySelectorAll("article");

        return parsed.map( (movie) => {
            if (movie) {
                let cat = {
                    id: movie.querySelector('a').rawAttributes['href'].toString().concat('/watching/'),
                    type: type,
                    title : movie.querySelector('.info').querySelector('li:nth-child(3)').rawText.toString(),
                    poster : movie.querySelector('a').querySelector('img').rawAttributes['src'].toString(),
                }
                if (movie.querySelector('a').querySelector('li:nth-child(2)')) {
                    cat.released = movie.querySelector('a').querySelector('li:nth-child(2)').rawText.toString();
                }
                // console.log(cat);
                return cat;
            }
            
        })
}


// search('series', 'game of thrones');

async function catalog (type, id, extra) {
    try {
        if(type === 'movie') {
            if (id === "CNmovies"){
                var URL = `${Host}/category/الافلام/`;

                if (extra === "New") {
                    var URL = `${Host}/الاحدث/`;
                }
                else if (extra === "Old"){
                    var URL = `${Host}/category/الافلام/`;
                }
                else if (extra === "Best"){
                    var URL = `${Host}/category/الافلام/`
                }
            }
else if (id === "CNmovies-Arabic") {
                var URL = `${Host}/category/افلام-عربية/`;
                if (extra === "New") {
                    var URL = `${Host}/category/افلام-عربية/`;
                }
                else if (extra === "Old"){
                    var URL = `${Host}/category/افلام-عربية/`;
                }
                else if (extra === "Best"){
                    var URL = `${Host}/category/افلام-عربية/`
                }
            }
            else if (id === "CNmovies-English") {
                var URL = `${Host}/category/افلام-اجنبية/`;
                if (extra === "New") {
                    var URL = `${Host}/category/افلام-اجنبية/`;
                }
                else if (extra === "Old"){
                    var URL = `${Host}/category/افلام-اجنبية/`;
                }
                else if (extra === "Best"){
                    var URL = `${Host}/category/افلام-اجنبية/`
                }
            }
            else if (id === "CNmovies-Turk") {
                var URL = `${Host}/category/افلام-تركية/`;
                if (extra === "New") {
                    var URL = `${Host}/category/افلام-تركية/`;
                }
                else if (extra === "Old"){
                    var URL = `${Host}/category/افلام-تركية/`;
                }
                else if (extra === "Best"){
                    var URL = `${Host}/category/افلام-تركية/`
                }
            }
            
            

        }
       else if (type === 'series') {
            if (id === "CNseries"){
                var URL = `${Host}/category/المسلسلات/`;

                if (extra === "New") {
                    var URL = `${Host}/الاحدث/`;
                }
                else if (extra === "Old"){
                    var URL = `${Host}/category/المسلسلات/`;
                }
                else if (extra === "Best"){
                    var URL = `${Host}/category/المسلسلات/`
                }
            }
            else if (id === "CNseries-Arabic") {
                var URL = `${Host}/category/مسلسلات-عربية/`;
            }
            else if (id === "CNseries-English") {
                var URL = `${Host}/category/مسلسلات-اجنبية/`;
            }
            else if (id === "CNseries-Turk") {
                var URL = `${Host}/category/مسلسلات-تركية/`;
            }
        }
        var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            let parsed = parser.parse(promise).querySelector("section").querySelectorAll("article");
            return parsed.map( (movie) => {
                let cat = {
                    id: movie.querySelector('a').rawAttributes['href'].toString(),
                    type: type,
                    name : movie.querySelector('.info').querySelector('li:nth-child(3)').rawText.toString(),
                    poster : movie.querySelector('a').querySelector('img').rawAttributes['src'].toString(),
                }
                if (movie.querySelector('a').querySelector('li:nth-child(2)')) {
                    cat.releaseInfo = movie.querySelector('a').querySelector('li:nth-child(2)').rawText.toString();
                }
                return cat;
                
            })
    }
    catch(error) {
        console.log(error);
    }
}

// catalog('series', 'CNseries-New');

async function meta (type, id) {

    if (type === 'movie'){
        try {
            var URL = id;
            var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            var link = res;
        }catch (error) {

            try {
                var promise = (await client.get(URL)).data;
                var link = URL;
            }catch(error) {
                console.log(error);
            }
            
        }
    }
    if (type == 'series') {
        try {
            var URL = id;
            var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            var link = res;
        }catch (error) {

            try {
                var promise = (await client.get(URL)).data;
                var link = URL;
            }catch(error) {
                console.log(error);
            }
            
        }
        
    }
    
    try {
        var promise = (await client.get(link)).data;
    }catch(error) {
        console.log(error)
    }

    let parsed = parser.parse(promise);

    var description;
    var bg;

    let title = parsed.querySelector('article').querySelector('img').rawAttributes['alt'].toString();
    if (type == 'movie') {
        description = parsed.querySelector("li[aria-label='story']").querySelector('p').rawText.toString();
        bg = parsed.querySelector('article').querySelector('img').rawAttributes['src'].toString();
    }
    if (type == 'series') {
        description = parsed.querySelector("li[aria-label='story']").querySelector('p').rawText.toString();
        bg = parsed.querySelector('article').querySelector('img').rawAttributes['src'].toString();
    }
    
    let year = parsed.querySelector('article').querySelector('ul:nth-child(1)').querySelector('li:nth-child(6)').rawText.toString();


    let genres = parsed.querySelector('article').querySelector('ul:nth-child(1)').querySelector('li:nth-child(5)').rawText.toString();

    

    let genre = [];
    
    genre = genres.filter( (elem) => {
        return elem !== undefined;
    })

    let metaObj ={
        id: id,
        name: title,
        posterShape: 'poster',
        type: type,
        poster: bg,
        background: bg,
        description: description,
    }

    if (genre) {
        metaObj.genre = genre;
    }
    if(year) {
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


}


// meta ('series', 'https://mycimaa.makeup/series/midnight-at-pera-palace/');


async function seasonlist(id) {

    try {
        var URL = id;
        var res = encodeURI(URL);
        var promise = (await client.get(res)).data;
        var link = res;
    }catch (error) {

        try {
            var promise = (await client.get(URL)).data;
            var link = URL;
        }catch(error) {
            console.log(error);
        }
        
    }
    try {
        var promise = (await client.get(link)).data;
    }catch(error){
        console.log(error);
    }

    let parsed = parser.parse(promise);
    var seasonsEpisodes = parsed.querySelector('main');

    var seasonarray =  [];

    try {
        
        if (seasonsEpisodes.querySelector("section[aria-label='seasons']")) {
            var seasonsList = seasonsEpisodes.querySelector("section[aria-label='seasons']").querySelectorAll('a');
            
            for (i = 0; i < seasonsList.length; i++) {
               
                var seasonUrl = seasonsList[i].rawAttributes['href'];
                var seasonData = (await client.get(seasonUrl)).data;
        
        
                let pars = parser.parse(seasonData);
                 var eplist = pars.querySelector('#eps').querySelector('a');
        
                eplist.reverse();
        
                for (j = 0; j < eplist.length; j++) {
                    var epUrl = eplist[j].rawAttributes['href'];
                    var epData =  (await client.get(epUrl)).data;
                    let edDataParsed = parser.parse(epData);
        
                    let epTitle = edDataParsed.querySelector('#eps').querySelector('a').querySelector('img:nth-child(2)').rawAttributes['alt'].toString();
        
                    seasonarray.push({
                        id: epUrl,
                        name: epTitle,
                        season: i+1,
                        episode: j+1,
                        available: true
                    })
        
                }
        
                }
    
        }
         else if (!seasonsList) {
            var eplist = parsed.querySelector('#eps').querySelector('a');
        
                eplist.reverse();
        
                for (j = 0; j < eplist.length; j++) {
                    var epUrl = eplist[j].rawAttributes['href'];
                    var epData =  (await client.get(epUrl)).data;
                    let edDataParsed = parser.parse(epData);
        
                    let epTitle = edDataParsed.querySelector('#eps').querySelector('a').querySelector('img:nth-child(2)').rawAttributes['alt'].toString();
        
                    seasonarray.push({
                        id: epUrl,
                        name: epTitle,
                        season: 1,
                        episode: j+1,
                        released: '2010-12-06T05:00:00.000Z',
                        available: true
                    })
         }
        }
    } catch( error) {
        console.log(error);
     }


    
    return seasonarray;

}


// seasonlist('https://mycimaa.cfd/series/loki/');

async function stream (type, id) {
    if (type === 'movie'){
        try {
            var URL = id;
            var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            var link = res;
        }catch (error) {

            try {
                var promise = (await client.get(URL)).data;
                var link = URL;
            }catch(error) {
                console.log(error);
            }
            
        }

        try {
            var promise = (await client.get(link)).data;
        }catch(error) {
            console.log(error);
        }

        let parsed = parser.parse(promise).querySelector('#download').querySelectorAll('a');

        var streamList =  parsed.map( stream => {
            return {
                url: stream.rawAttributes['href'],
                name: stream.querySelector('a').rawText
            }

        })

        return streamList;
    }
    else if (type === 'series') {

        try {
            var URL = id;
            var res = encodeURI(URL);
            var promise = (await client.get(res)).data;
            var link = res;
        }catch (error) {

            try {
                var promise = (await client.get(URL)).data;
                var link = URL;
            }catch(error) {
                console.log(error);
            }
            
        }
        try {
            var promise = (await client.get(link)).data;
        }catch(error) {
            console.log(error);
        }

        let parsed = parser.parse(promise).querySelector('#download').querySelectorAll('a');

        var epStreamList =  parsed.map( stream => {
            return  {
                url: stream.rawAttributes['href'],
                name: stream.querySelector('a').rawText
            }

        })

        return epStreamList;
    }
    
}



// stream('series', 'https://mycimaa.cfd/watch/%d9%85%d8%b4%d8%a7%d9%87%d8%af%d8%a9-%d9%85%d8%b3%d9%84%d8%b3%d9%84-pivoting-%d9%85%d9%88%d8%b3%d9%85-1-%d8%ad%d9%84%d9%82%d8%a9-1/');


module.exports = {
    // axiosData,
    search,
    catalog,
    meta,
    stream
};
