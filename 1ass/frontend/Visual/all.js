class Event {
    constructor(time, place) {
        this.time = time;
        this.place = place;
    }

    getTime() {
        return this.time;
    }

    getPlace() {
        return this.place;
    }
}

class WeatherData extends Event {
    constructor(time, place, value, type, unit) {
        super(time, place);
        this.value = value;
        this.type = type;
        this.unit = unit;
    }

    getValue() {
        return this.value;
    }

    getType() {
        return this.type;
    }

    getUnit() {
        return this.unit;
    }
}

class WeatherPrediction extends WeatherData {
    constructor(time, place, max, min, type, unit) {
        super(time, place, null, type, unit);
        this.max = max;
        this.min = min;
    }

    getMax() {
        return this.max;
    }

    getMin() {
        return this.min;
    }

    matches(data) {
        if (data instanceof WeatherData) {
            return data.getType() === this.type && data.getValue() >= this.min && data.getValue() <= this.max;
        } else {
            console.log('Data is not an instance of WeatherData');
            return false;
        }
    }
}

class Precipitation extends WeatherData {
    constructor(time, place, value, type, unit) {
        super(time, place, value, type, unit);
    }

    getPrecipitationType() {
        return this.type;
    }

    convertToInches() {
        if (this.unit === 'mm') {
            this.value = this.value * 0.04;
            this.unit = 'inches';
        } else {
            console.log('Type is not mm');
        }
    }

    convertToMM() {
        if (this.unit === 'inches') {
            this.value = this.value * 25.4;
            this.unit = 'mm';
        } else {
            console.log('Unit is not inches');
        }
    }
}

class PrecipitationPrediction extends WeatherPrediction {
    constructor(time, place, max, min, type, unit) {
        super(time, place, max, min, type, unit);
    }

    getExpectedTypes() {
        return this.type;
    }

    convertToInches() {
        if (this.unit === 'mm') {
            this.value = this.value * 0.04;
            this.unit = 'inches';
        } else {
            console.log('Type is not mm');
        }
    }

    convertToMM() {
        if (this.unit === 'inches') {
            this.value = this.value * 25.4;
            this.unit = 'mm';
        } else {
            console.log('Unit is not inches');
        }
    }
}

class Temperature extends WeatherData {
    constructor(time, place, value, type, unit) {
        super(time, place, value, type, unit);
    }

    convertToF() {
        if (this.unit === 'C') {
            this.value = (this.value * 9/5) + 32;
            this.unit = 'F';
        } else {
            console.log('Unit is not Celsius');
        }
    }

    convertToC() {
        if (this.unit === 'F') {
            this.value = (this.value - 32) * 5/9;
            this.unit = 'C';
        } else {
            console.log('Unit is not Fahrenheit');
        }
    }
}

class TemperaturePrediction extends WeatherPrediction {
    constructor(time, place, max, min, type, unit) {
        super(time, place, max, min, type, unit);
    }

    convertToF() {
        if (this.unit === 'C') {
            this.value = (this.value * 9/5) + 32;
            this.unit = 'F';
        } else {
            console.log('Unit is not Celsius');
        }
    }

    convertToC() {
        if (this.unit === 'F') {
            this.value = (this.value - 32) * 5/9;
            this.unit = 'C';
        } else {
            console.log('Unit is not Fahrenheit');
        }
    }
}

class Wind extends WeatherData {
    constructor(time, place, value, type, unit) {
        super(time, place, value, type, unit);
    }

    getDirection() {
        return this.type;
    }

    convertToMPH() {
        if (this.unit === 'm/s') {
            this.value = this.value * 2.23;
            this.unit = 'MPH';
        } else {
            console.log('Unit is not m/s');
        }
    }

    convertToMS() {
        if (this.unit === 'MPH') {
            this.value = this.value / 2.23;
            this.unit = 'm/s';
        } else {
            console.log('Unit is not MPH');
        }
    }
}

class WindPrediction extends WeatherPrediction {
    constructor(time, place, max, min, type, unit) {
        super(time, place, max, min, type, unit);
    }

    getExpectedDirections() {
        return this.type;
    }

    convertToMPH() {
        if (this.unit === 'm/s') {
            this.value = this.value * 2.23;
            this.unit = 'MPH';
        } else {
            console.log('Unit is not m/s');
        }
    }

    convertToMS() {
        if (this.unit === 'MPH') {
            this.value = this.value / 2.23;
            this.unit = 'm/s';
        } else {
            console.log('Unit is not MPH');
        }
    }
}
