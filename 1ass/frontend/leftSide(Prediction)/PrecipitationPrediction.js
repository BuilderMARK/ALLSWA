class PrecipitationPrediction extends WeatherPredicition {
    constructor(time,place,max,min,type,unit){
        super(time,place,max,min,type,unit)
    }

    getExpectedTypes(){
        return this.type
    }

    matches(data) {
        if (data instanceof WeatherData) {
            return data.getType() === this.type && data.getValue() >= this.min && data.getValue() <= this.max;
        } else {
            console.log('Data is not an instance of WeatherData');
            return false;
        }
    }

    convertToInches(){
        //Void
        if (type ==='mm'){
            this.value = this.value*0.04
            this.unit = 'inches'
        }
        else {
            console.log('Type is not mm')
        }
    }
    
    convertToMM(){
        //Void
        if (this.unit === 'inches'){
            this.value = this.value *25.4;
            this.unit == 'mm'
        } else 
        {
            console.log('Unit is not inches')
        }
    }
    //End 
}