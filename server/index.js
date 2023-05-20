let tempFinal;
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
    path: 'COM3',
    baudRate: 9600,
});

const parser = puerto.pipe(new DelimiterParser({ delimiter: '\n'}))

parser.on('open', function(){
    console.log('Conexión abierta');
});

parser.on('data', function(data){
    var enc = new TextDecoder();
    var arr = new Uint8Array(data);
    var ready = enc.decode(arr);
    //console.log(ready);
    /*io.emit('arduino:data', {
        value: ready
    });*/
    tempFinal = ready;
    enviarTemperatua();
});

const enviarTemperatua = async () => {
    const envioTemp = {
        "temperature" : tempFinal 
    }
    
    const lambdaEndpoint = "https://x230vnbpw4.execute-api.us-east-2.amazonaws.com/test/arduino-termometro";
    fetch(lambdaEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(envioTemp)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    
    for (let key in data) {
        console.log(`Propiedad: ${key}, Valor: ${data[key]}`);
    }
})
    .catch(error => console.error(error));

}


puerto.on('error', function(err){
    console.log(err);
});

server.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});