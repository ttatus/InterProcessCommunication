var api = {};
global.api = api;
api.net = require('net');

var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11, 27, 32];
var clientsNumber = 4;
var clients = [];
var result = new Array(task.length);
var resultNumber = 0;

var server = api.net.createServer(function(socket) {
    console.log('Connected: ' + socket.localAddress);

    clients.push(socket);
    var index = clients.length-1;

    if (clients.length === clientsNumber) {
        clients.forEach(function(client, i, array) {
            partLength = task.length / clientsNumber;
            taskPart = task.slice(i * partLength, (i+1) * partLength);
            client.write(JSON.stringify(taskPart));
        })
    }

    socket.on('data', function(data) {
        //console.log("Result:" + data);
        res = JSON.parse(data);
        for(var i=0; i<partLength; i++) {
            result[i+index*partLength] = res[i];
        }
        resultNumber++;
        if (resultNumber == clientsNumber) {
        console.log(result);
        }
    });
}).listen(2000);
