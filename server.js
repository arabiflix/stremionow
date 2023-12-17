#!/usr/bin/env node

const { serveHTTP, publishToCentral } = require("stremio-addon-sdk");
const addonInterface = require("./addon");
serveHTTP(addonInterface, { port: process.env.PORT || 63657 });

// Uncomment the line below when you've deployed your addon
publishToCentral("http://8e55bfcf6ffb-stremionow.baby-beamup.club/manifest.json");
// For more information on deploying, see: https://github.com/Stremio/stremio-addon-sdk/blob/master/docs/deploying/README.md
