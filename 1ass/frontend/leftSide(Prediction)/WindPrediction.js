class WindPrediction extends WeatherPrediction{
    constructor(time,place,max,min,type,unit){
        super(time,place,max,min,type,unit)
    }

    getExpectedDirections(){
        return
    }


    matches(data){
        return 
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

    //End 
}