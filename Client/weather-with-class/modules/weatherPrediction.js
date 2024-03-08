export class weatherPrediction {
    #UnixTimestamp;
    #Date
    #TemperatureInKelvin;
    #TemperatureInCelsius;
    #Description;

    constructor(unixTimestamp, temperatureInKelvin, description) {
        this.#UnixTimestamp = unixTimestamp;
        this.#Date = this.#convertToDate();
        this.#TemperatureInKelvin = temperatureInKelvin;
        this.#TemperatureInCelsius = this.#convertToCelsius();
        this.#Description = description
    }
    get UnixTimestamp() {
        return this.#UnixTimestamp
    }
    get TemperatureInKelvin() {
        return this.#TemperatureInKelvin
    }
    get Description() {
        return this.#Description
    }
    get TemperatureInCelsius() {
        return this.#TemperatureInCelsius
    }
    get Date() {
        return this.#Date
    }

    #convertToCelsius() {
        return (this.#TemperatureInKelvin - 273.15).toFixed(1) // Kelvin naar Celsius omzetten is relatief eenvoudig (-273.15 aftrekken).
    }

    #convertToDate() {
        return new Date(this.#UnixTimestamp * 1000) // Unix is tijd in seconden sinds 1/1/1970. Vandaar x 1000 om milliseconden te hebben.
    }

    render(htmlElement) {
        let row = document.createElement('tr');
        let htmlString = `
            <td>${this.#Date.toLocaleString()}</td>
            <td>${this.#TemperatureInCelsius}</td>
            <td>${this.#Description}</td>
            `;
        row.insertAdjacentHTML('beforeend', htmlString);
        htmlElement.appendChild(row);
    }
}