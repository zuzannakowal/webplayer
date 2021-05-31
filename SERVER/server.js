var fs = require("fs");
var http = require("http");

/*

/albums (GET)

[
  {id: 1, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
  {id: 2, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
  {id: 3, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
  {id: 4, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
  {id: 5, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
  {id: 6, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
  {id: 7, tytul: "ummagamma", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
  {id: 8, tytul: "delicate sound", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
  {id: 9, tytul: "the wall", zespol:"pink floyd",img:"https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg"},
]

/songs?albumid=1 (GET)

[
  {id: 1, plytaId: "1", tytul:"take on me",size:"9.83", uri: "http://xn--odgosy-5db.pl/odglosy/swinia.mp3"},
  {id: 4, plytaId: "1", tytul:"another brick", size:"3.17", uri: "http://odgłosy.pl/odglosy/swierszcz.mp3"},
  {id: 7, plytaId: "1", tytul:"duck",size:"9.83", uri: "http://odgłosy.pl/odglosy/kaczki.mp3"},
]

/songs?albumid=3
[
  {id: 2, plytaId: "3", tytul:"just give me a reason",size:"8.32", uri: "http://odgłosy.pl/odglosy/kon01.mp3"}
]
*/
var albumy = [
  { id: 1, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 2, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 3, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 4, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 5, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 6, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 7, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 8, tytul: "delicate sound", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 9, tytul: "the wall", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
]

var piosenki = [
  { id: 1, plytaId: "1", tytul: "take on me", size: "9.83", uri: "http://xn--odgosy-5db.pl/odglosy/swinia.mp3" },
  { id: 4, plytaId: "1", tytul: "another brick", size: "3.17", uri: "http://odgłosy.pl/odglosy/swierszcz.mp3" },
  { id: 7, plytaId: "1", tytul: "duck", size: "9.83", uri: "http://odgłosy.pl/odglosy/kaczki.mp3" },
  { id: 2, plytaId: "3", tytul: "just give me a reason", size: "8.32", uri: "http://odgłosy.pl/odglosy/kon01.mp3" }
]

function albumResponse(req, res) {
  console.log("listing albums")
  var albums = albumy;
  //console.log(albums);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' });
  res.write(JSON.stringify(albums))
  res.end();
}

function songsResponse(req, res) {
  var songs = piosenki;
  console.log(songs);
  res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' });
  res.end(JSON.stringify(songs));
}

var server = http.createServer(function (req, res) {
  console.log(req.method,":", req.url)

  switch (req.method) {
    case "OPTIONS":
      console.log("options")
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end();
      break;
    case "GET":
      switch (req.url) {
        case "/albums":
          albumResponse(req, res)
          break;
        case "/songs":
          songsResponse(req, res)
          break;
        default:
          res.writeHead(404);
          console.log("nie ma takiej stony")
          res.write("nie ma takiej strony")
          res.end()
      }
      break;
    case "POST":
      switch (req.url) {
        case "/":
          break;
        default:
          res.writeHead(404)
          res.write("to nie istnieje")
          res.end()
          console.log("404")
      }
      break;

  }
});

server.listen(3000, function () {
  console.log("serwer startuje na porcie 3000")
});
