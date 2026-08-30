// CS55.13-Fall-2026-Week-02

//use http package (shared code) from node.js
const myhttp = require('http');

//load the core node filesystem (fs) module, using js promises instead of callbacks
const fs = require("fs").promises;

//create a function to respond to http requests
const requestListener =  function( myrequest, myresponse ) {
        console.log( myrequest.url );

        let mytext;
        if (myrequest.url === '/') {
            fs.readFile(__dirname + "/mypage.html").then(
                contents => {
                    myresponse.setHeader("Content-Type", "text/html; charset=UTF-8");
                    myresponse.writeHead(200);
                    myresponse.end(contents); 
                }
            )
        } else {
            //if request url not root, return to json file
            fs.readFile(__dirname + "/sw_lore.json").then(
                contents => {
                    myresponse.setHeader("Content-Type", "application/json; charset=UTF-8");
                    myresponse.writeHead(200);
                    myresponse.end(contents);
                }
            );
        }

    };

//use http package createServer()
//that runs a web server
let myserver = myhttp.createServer(
    // createServer() uses our function to run when a request comes in
   requestListener
);

// ask http to start listening on a tcp port for incomoing http requests
// listen() takes 2 args: l: tcp port number, string of the ip addreass to listen (0.0.0.0)
myserver.listen( 8080, "127.0.0.1" );