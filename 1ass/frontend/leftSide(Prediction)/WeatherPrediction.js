class WeatherPredicition extends Event{
    constructor(time,place,max,min,type,unit){
        super(time,place)
        this.max = max
        this.min = min
        this.type = type
        this.unit = unit
    }
    getMax(){
        return this.max
    }
    getMin(){
        return this.min
    }
    getType(){
        return this.type
    }
    getUnit(){
        return this.unit
    }
    //End
}