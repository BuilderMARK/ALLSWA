class Wind extends WeatherData{
    constructor(time,place,from,to,type,unit){
        super(time,place,from,to,type,unit)
    }

    getDirection(){
        return this.type;
    }

    convertToMPH(){
        //Void
        if (type === 'm/s'){
            this.value = this.value * 2.23
            this.unit = 'MHP'
        }
        else 
        {
            console.log('Unit IS not m/s')
        }
    }

    convertToMS(){
        //Void
        if (type == 'MHP' ){
            this.value = this.value / 2.23
            this.unit = 'm/s'
        }
        else {
            console.log('Unit is not MPH')
        }
    }

    toString1() {
        return `Time: ${this.time}, Place: ${this.place}, From: ${this.from},  Unit:${this.unit}, To: ${this.to}${this.unit}, Type: ${this.type}`;
    }


}