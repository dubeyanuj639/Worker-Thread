const { workerData, parentPort, isMainThread } = require('worker_threads')

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
var data = new Array(10000000).fill({ userName: 'Ram' })

data.forEach((item, index) => {
    item.userName = 'Army'
})

// Get the Data that will passed in worker 
console.log('workerData -->', workerData)
// isMainThread Is true if this code is not running inside of a Worker thread.
console.log('Not in main Thread. It is in worker thread -->', isMainThread)



let result = data.filter(ele => {
    return ele.userName == 'Army'
})
// to send a message from the worker to the main thread, we use parentPort.postMessage()
parentPort.postMessage(result)
