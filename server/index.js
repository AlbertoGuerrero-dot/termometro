const SerialPort = require('serialport').SerialPort;
const { DelimiterParser } = require('@serialport/parser-delimiter');

const puerto = new SerialPort({
    path: 'COM5',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
})

const parser = puerto.pipe(new DelimiterParser({ delimiter: '\n'}))

parser.on('open', function(){
    console.log('Conexion abierta');
});

parser.on('open', function(data){
    var enc = new TextDecoder();
    var arr = new Uint8Array(data);
    ready = enc.decode(arr)
    console.log(ready);
});

puerto.on('error', function(err){
    console.log(err);
})