var api = {};
global.api = api;
api.net = require('net');

var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
var clientsNumber = 2;
clients = [];

var server = api.net.createServer(function(socket) {
    console.log('Connected: ' + socket.localAddress);

    clients.push(socket);

    if (clients.length === clientsNumber) {
        clients.forEach(function(client, i, array) {
            partLength = task.length / clientsNumber;
            taskPart = task.slice(i * partLength, (i+1) * partLength);
            client.write(JSON.stringify(taskPart));
        })
    }

    socket.on('data', function(data) {
        console.log("Result:" + data);
  });
}).listen(2000);
