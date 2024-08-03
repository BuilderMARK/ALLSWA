class Temperature extends WeatherData {
    constructor(time,place,from,to,type,unit){
        super(time,place,from,to,type,unit)
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

    toString1() {
        return `Time: ${this.time}, Place: ${this.place}, From: ${this.from},  Unit:${this.unit}, To: ${this.to}${this.unit}, Type: ${this.type}`;
    }
    // end 
}