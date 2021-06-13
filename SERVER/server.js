var fs = require("fs");
var http = require("http");
var url = require("url")
var formidable = require("formidable")
const { uuid } = require('uuidv4');
const portNum = 3000

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
var albumy = []
/*
[
  { id: 1, tytul: "ummagamma", zespol: "pink floyd", img: "https://images-na.ssl-images-amazon.com/images/I/51yJTk7o%2BaL._SY1000_.jpg" },
  { id: 2, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 3, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 4, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 5, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 6, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 7, tytul: "ummagamma", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 8, tytul: "delicate sound", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
  { id: 9, tytul: "the wall", zespol: "pink floyd", img: "https://lastfm.freetls.fastly.net/i/u/500x500/0f05cdb52e9242bd8dd4aa9cf1ce2fb7.jpg" },
]

*/

var piosenki = []
/*[
  { id: 1, plytaId: "1", tytul: "take on me", size: "9.83", uri: "http://xn--odgosy-5db.pl/odglosy/swinia.mp3" },
  { id: 4, plytaId: "1", tytul: "another brick", size: "3.17", uri: "http://odgłosy.pl/odglosy/swierszcz.mp3" },
  { id: 7, plytaId: "1", tytul: "duck", size: "9.83", uri: "http://odgłosy.pl/odglosy/kaczki.mp3" },
  { id: 2, plytaId: "3", tytul: "just give me a reason", size: "8.32", uri: "http://odgłosy.pl/odglosy/kon01.mp3" }
]
*/

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
  const queryObject = url.parse(req.url, true).query
  console.log("listuje piosenki z albumu: ", queryObject.albumId);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' });
  const album = []
  for (let s in songs) {
    if (songs[s].plytaId == queryObject.albumId) {
      album.push(songs[s])
    }
  }
  console.log("znalazlem ", album.length, "piosenek")
  res.end(JSON.stringify(album));
}

function fileResponse(req, response, path) {
  let contentType = "text/plain"
  if (path.endsWith(".jpg")) {
    conentType = 'image/jpeg'
  } else if (path.endsWith(".mp3")) {
    contentType = 'audio/mpeg'
  } else if (path.endsWith(".html")) {
    contentType = 'text/html'
  } else {
    console.log("type unrecognised, using default")
  }
  console.log("attempting to serve file:", path, "with content type:", contentType)

  let stats = fs.statSync(path)

  fs.readFile(path, function (error, data) {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.write("<h1>404 - nie ma pliku!<h1>");
      response.end();
    } else {
      response.writeHead(200, {
        'Content-Type': contentType,
        "Content-Length": stats.size,
        "Accept-Ranges": "bytes"
      });
      response.write(data);
      response.end();
    }
  })
}

function fileUpload(req, res) {
  console.log("File upload")
  let form = formidable({})
  let files = []
  form.on('file', function (field, value) {
    // console.log(field, value)
    console.log("file received")
    files.push(value)
  })
  form.on("end", function () {
    console.log("otrzymano", files.length, "plikow")
    if (files.length > 0) {
      const myDirname = __dirname + "/music/" + uuid()
      console.log("zakladam folder na album", myDirname)
      fs.mkdirSync(myDirname)
      for (i in files) {
        console.log("plik:", files[i].name, files[i].path)
        fs.renameSync(files[i].path, myDirname + "/" + files[i].name)
      }
    }
    initSongs();
    res.writeHead(200, { 'content-type': "text/plain" })
    res.end("file saved")
  })
  form.parse(req, function (err, fields, files) {
    console.log("bajtow w formularzu", form.bytesExpected, "otrzymanych:", form.bytesReceived)
  })
}

function initSongs() {
  albumy.splice(0)
  piosenki.splice(0)
  let albumId = 0;
  let songId = 0;
  const folder = __dirname + "/music"
  console.log("inicjalizuje liste piosenek z folderu:", folder)
  const files = fs.readdirSync(folder);
  for (let i in files) {
    let albumName = files[i]
    if (albumName.charAt(0) == ".") {
      console.log("skipping", albumName)
    } else {
      console.log(albumName)
      var stats = fs.statSync(folder + "/" + albumName)
      if (!stats.isFile()) {
        console.log("znalazlem album", albumId)
        let album = {
          id: albumId,
          tytul: albumName,
          zespol: albumName,
          img: `http://localhost:${portNum}/static/cover.jpg`
        }
        albumy.push(album)

        let songs = fs.readdirSync(folder + "/" + albumName);
        for (let j in songs) {
          let songName = songs[j]
          console.log("album:", albumId, "album:", albumName, "file:", songName)
          if (songName.endsWith(".mp3")) {
            let songStats = fs.statSync(folder + "/" + albumName + "/" + songName)
            let song = {
              id: songId,
              plytaId: albumId,
              tytul: songName,
              size: songStats.size / 1024 / 1024,
              uri: `http://localhost:${portNum}/music/${albumName}/${songName}`
              //uri: "http://odgłosy.pl/odglosy/kon01.mp3"
            }
            piosenki.push(song)
            songId++
          } else if (songName.endsWith(".jpg")) {
            console.log("znaleziono okladke")
            albumy[albumId].img = `http://localhost:${portNum}/music/${albumName}/${songName}`
          }
        }
        albumId++;
      }
    }
  }
  console.log("koniec inicjalizacji. albumow:", albumy.length, "piosenek:", piosenki.length)
}




initSongs()

var server = http.createServer(function (req, res) {
  console.log(req.method, ":", req.url)
  switch (req.method) {
    case "OPTIONS":
      console.log("options")
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.end();
      break;
    case "GET":
      if (req.url == "/albums") {
        albumResponse(req, res)
      } else if (req.url.startsWith("/songs")) {
        songsResponse(req, res)
      } else if (req.url.endsWith(".jpg")) {
        console.log("daje obrazek")
        fileResponse(req, res, __dirname + decodeURI(req.url))
      } else if (req.url.endsWith(".mp3")) {
        console.log("daje piosenke")
        fileResponse(req, res, __dirname + decodeURI(req.url))
      } else if (req.url == "/" || req.url == "/admin") {
        fileResponse(req, res, "static/index.html")
      } else {
        res.writeHead(404);
        console.log("nie ma takiej stony")
        res.write("nie ma takiej strony")
        res.end()
      }
      break;
    case "POST":
      if (req.url == "/upload") {
        fileUpload(req, res)
      } else {
        res.writeHead(404)
        res.write("to nie istnieje")
        res.end()
        console.log("404")
      }
  }
});

server.listen(portNum, function () {
  console.log("serwer startuje na porcie 3000")
});
