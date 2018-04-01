const http = require('http');
const url = require('url');
const fetch = require('node-fetch');
// Enter your Google URL Shortener key
const apiKey = '';
http.createServer((req, res) => {
  const { q: input } = url.parse(req.url, true).query;
  const options = {
    method: 'POST',
    body: JSON.stringify({ longUrl: input }),
    headers: { 'Content-Type': 'application/json' },
  };
  fetch(`https://www.googleapis.com/urlshortener/v1/url?key=${apiKey}`, options)
    .then(res => res.json())
    .then((json) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ messages: [{ text: json.id }] }));
    }).catch(err => console.error(err));
}).listen(process.env.PORT || 3000);
