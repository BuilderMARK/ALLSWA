class Precipitation extends WeatherData{
    constructor(time,place,value,type,unit){
        super(time,place,value,type,unit)
    }
getPrecipitationType(){
    return this.type
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
// End of class    
}