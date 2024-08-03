class TemperaturePredicition extends WeatherPredicition{
    constructor(time,place,max,min,type,unit){
        super(time,place,max,min,type,unit)
    }
    convertToF() {
        if (this.unit === 'C') {
            this.value = (this.value * 9/5) + 32;
            this.unit = 'F';
        } else {
            console.log('unit is not Celsius');
        }
    }

    convertToC() {
        if (this.unit === 'F') {
            this.value = (this.value - 32) * 5/9;
            this.unit = 'C';
        } else {
            console.log('unit is not Fahrenheit');
        }
    }

    // End
}