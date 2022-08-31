
const windWorker = new Worker(new URL('./wind-sim-worker.js', import.meta.url));
console.log('hello world' )

const requestWindProperties = (timeOffset) => {
    windWorker.postMessage(timeOffset);
}

windWorker.onmessage = (e) => {
    const windProperties = e.data;
    console.log(windProperties?.x, windProperties?.y)
}

//const windVector = {x: 0,  y:0} 

setInterval(()=>{
    requestWindProperties(0);
}, 10)
