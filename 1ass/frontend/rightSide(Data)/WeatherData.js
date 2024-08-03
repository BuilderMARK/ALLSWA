class Wind extends Event{
    constructor(time,place,from,to,type,unit){
        super(time,place)
        this.from = from;
        this.to = to;
        this.type = type;
        this.unit = unit;
    }

    getFrom(){
        return this.from
    }
    getTo(){
        return this.to
    }

    getType () {
        return this.type
    }

    getUnit(){
        return this.unit
    }

}