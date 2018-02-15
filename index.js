"use strict";
const http = require("http");
const url = require("url");
const fetch = require("node-fetch");
const port = process.env.PORT || 3000;
// Enter your Google URL Shortener key
let apiKey = "";
http.createServer((req, res) => {
    let query = url.parse(req.url, true).query;
    fetch(`https://www.googleapis.com/urlshortener/v1/url?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({ longUrl: query.q }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(json => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ messages: [{ text: json.id }] }));
        }).catch(err => console.error(err));
}).listen(port, () => console.log(`Your app is listening on port ${port}`));