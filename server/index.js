const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', function(socket){
    console.log("Nuevo socket conectado");
})

app.get('/', (req, res, next) =>{
    res.sendFile(__dirname + '/index.html');
});

const SerialPort = require('serialport').SerialPort;
const { DelimiterParser } = require('@serialport/parser-delimiter');

const puerto = new SerialPort({
    path: 'COM4',
    baudRate: 9600,
});

const parser = puerto.pipe(new DelimiterParser({ delimiter: '\n'}))

parser.on('open', function(){
    console.log('Conexion abierta');
});

parser.on('data', function(data){
    var enc = new TextDecoder();
    var arr = new Uint8Array(data);
    var ready = enc.decode(arr);
    console.log(ready);
    io.emit('arduino:data', {
        value: ready
    });
    //var temperatura = ready.match(/\d+/);
    // Actualiza la etiqueta h6 con la temperatura
    //var temperaturaElem = document.getElementById('temperatura');
    //temperaturaElem.textContent = "Temperatura: " + temperatura + " grados Celsius";
});

puerto.on('error', function(err){
    console.log(err);
});

server.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});