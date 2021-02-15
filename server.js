// const http = require('http');
// const server = http.createServer();

// server.on('listening', () => {
//     console.log("serveur démarré");
// })

// server.on('request', (request, response) => {
//     const content_type = 'text/html; charset=utf-8';
//     response.setHeader('Content-Type', content_type);
//     response.end("<h1>Serveur lancé</h1>");
// })

// server.listen(8080);


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Test réussi !')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
