const { parentPort } = require("worker_threads");
parentPort.on("ready", (time) => {
    setTimeout(function() {}, time);
    result = 1;
    parentPort.postMessage(result);
});