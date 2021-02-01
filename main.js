import express from 'express';
const app = express()
const PORT = 9000

app.listen(PORT, (err, result) => {
    if (!err) console.log('Main Server has Started.')
    else console.log('Getting Error in starting Main Server')
})

// Testing Routes to check server is blocking or not.
app.get('/', (req, res) => {
    doSomething().then(data => {
        res.status(200).send({ message: "Ok" })
    }).catch(err => {
        console.log('this is Error ->', err)
    })
})

// Create a Promise that will return after 3 sec
const doSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000)
    })
};

/* Configure Of Worker_Thread */
const { Worker, isMainThread } = require('worker_threads')
console.log('In main thread', isMainThread)
function runService(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0)
                reject(new Error(`Worker stopped with exit code ${code}`));
        })
    })
}

runService({ userId: '1', userName: 'Anuj Dubey' }).then(result => {
    console.log('Getting result from Script.js ->', result)
}).catch(err => console.error(err))