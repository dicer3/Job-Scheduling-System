const {Worker, parentPort, workerData} = require('worker_threads');
const max = 25;
const min = 5;
const randomNo = Math.floor(Math.random() * (max - min + 1) + min);

const newJob=(id)=>{
    setTimeout(function() {
    parentPort.postMessage(`job finished ${id} in time  ${randomNo}`);    
},randomNo*1000)};

newJob(workerData);