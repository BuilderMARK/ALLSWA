const showIDData = document.getElementById('data')
const showminTemp = document.getElementById('minTemp')
document.getElementById('citySelector').addEventListener('change',function(event){
    const city = event.target.value
    console.log(city)
    allDayForcast(city)
    minTempForTodayF(city)
})
async function allDayForcast (city = 'Horsens'){
const response = await fetch (`http://localhost:8080/forecast/${city}`)
const forecast = await response.json();
console.log(forecast)
showIDData.innerHTML = ''
forecast.forEach(f => {
    const div = `<div>
    <p> <span> Type: </span> ${f.type} </p>
    <p> <span> Place: </span> ${f.place} </p>
    <p> <span> To: </span> ${f.to} </p>
    <p> <span> From: </span> ${f.from} </p>
    <p> <span> Unit: </span> ${f.unit} </p>
    <p> <span> Time: </span> ${f.time} </p>
    </div>`
    showIDData.innerHTML+=div
});
const newForcast = forecast.map((f)=>{
    if(f.type === 'temperature'){
        return new Temperature(f.time,f.place,f.value,f.type,f.unit)
    }
    else if (f.type === 'wind speed')
    {
        return new Wind(f.time,f.place,f.value,f.type,f.unit)
    }
    else if (f.type === 'precipitation')
        return new Precipitation(f.time,f.place,f.value,f.type,f.unit)
})
/*console.log(newForcast)*/
}
async function minTempForTodayF(city = 'Aarhus', time = '2024-06-29') {
    let tempMin = null;
    let newTemp = null; 
    let counter = 0;
    let rains = 0;
    const response = await fetch(`http://localhost:8080/forecast/${city}`);
    const forecast = await response.json();
    const temperatures = forecast.filter(f =>
        f.type === 'temperature' && f.time.startsWith(time)
    );
    const winds = forecast.filter(f =>
        f.type === 'wind speed' && f.time.startsWith(time)
    );
    const rain = forecast.filter(f =>
        f.type === 'precipitation' && f.time.startsWith(time)
    );

    
    console.log("rain" , rain)
    //console.log("TEmp" , temperatures)

    rain.forEach(w => {
        rains += w.to  
    })

    winds.forEach(w => {
        counter += w.to  
    })


    temperatures.forEach(f => {
        console.log(f)
        if (!tempMin  || f.from < tempMin) {
            tempMin = f.from;
            console.log("Inside");
            newTemp = new Temperature(f.time, f.place, tempMin, f.type, f.unit);
            //console.log(newTemp.value, newTemp.unit)
            newTemp.convertToF()
            //console.log(newTemp.value, newTemp.unit)
        }
        console.log("No data");
    });
    document.getElementById('minTemp').innerHTML = `<p>Koldeste Dag i ${newTemp.place} er ${newTemp.value}: ${newTemp.unit}</p>`;
    document.getElementById('avgWindSpeed').innerHTML = `<p>avg wind speed ${Math.round(counter/winds.length)}</p>`;
    document.getElementById('avgWindSpeed').innerHTML = `<p>Total Rain ${rains}</p>`;
}






allDayForcast('Horsens')
minTempForTodayF()



