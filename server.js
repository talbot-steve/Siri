

var http = require('http');
var server = http.createServer();
server.listen(8887);
var messages = [
    "Hello there.", 
    "I'm sorry, I cannot take any requests at this time.", 
    "I can tell you how to do that."
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomMessage() {
    return messages[getRandomInt(0, messages.length)];
}

server.on('request', function (request, response) {
    response.writeHead(200, {
        'Connection': 'close',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    });
    switch (request.method) {
        case 'OPTIONS': 
            response.end();
        case 'GET':
            var myMessage = {message: getRandomMessage()}
            response.end(JSON.stringify(myMessage))
            break
        default:
            var errMessage = {error: "I didn't understand that"}
            response.end(JSON.stringify(errMessage))
    }
});