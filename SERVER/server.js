var fs = require("fs");
var http = require("http");

var server = http.createServer(function(req,res){
  console.log(__dirname)   
  fs.readdir(__dirname, function(err, files){
    if (err){
      return console.log(err)
    }
    files.forEach(function(filename){
      console.log(fileName);
    });
  })
});

server.listen(3000, function(){
    console.log("serwer startuje na porcie 3000")
});
