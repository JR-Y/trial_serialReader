const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const fs = require('fs')
let arr = [];

const port = new SerialPort("COM5", { baudRate: 115200 })

const parser = new Readline()
port.pipe(parser)
parser.on('data', line => {
    let obj;
    try {
        console.log(line)
        obj = JSON.parse(line);

    } catch (error) {
        console.log("failed")
    }
    if (obj) {
        arr.push(obj);
        console.log(arr.length)
        if(arr.length > 0 && Number.isInteger(arr.length / 50) ){
            fs.writeFile("data.json",JSON.stringify(arr),()=>{});
        }
    }
})