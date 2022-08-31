
const wind = (timeOffset) => {
    const time = (performance.now() / 10000) + 23;
    
    const x = Math.sin(0.5 * time) * Math.cos(3*time) * (Math.sin(time/5)/2) + 0.3;
    const y = 0.5 * Math.cos(4 * time) * Math.sin(time/2) - 0.1;
    return [x, y];
}

onmessage = (e) => {
   
    const timeOffsetContext = e.data;
    if (typeof timeOffsetContext == 'number') {
        
        const windXY = wind(timeOffsetContext);
        postMessage({x: windXY[0], y: windXY[1]})
    }
}

 