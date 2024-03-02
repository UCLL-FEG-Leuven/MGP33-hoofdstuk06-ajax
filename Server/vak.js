// De backend maakt ook gebruik van een Vak class, maar de implementatie verschilt van die van de frontend
// (zo heeft de Vak class van de backend geen render methode wegens niet van toepassing)
export class Vak {
    #id;
    #naam;
    #studiepunten;
    #aantalUren;

    constructor(id, naam, studiepunten, aantalUren) {
        this.#id = id;
        this.#naam = naam;
        this.#studiepunten = studiepunten;
        this.#aantalUren = aantalUren;
    }

    // Als een object toJSON() implementeert zal de JSON.stringify() deze methode aanroepen.
    // Zo heb je zelf controle over wat er wordt geserialiseerd want
    // 1) We willen de private variabelen serialiseren (private variabelen worden standaard niet geserialiseerd)
    toJSON() {
        return {
            id: this.#id,
            naam: this.#naam,
            studiepunten: this.#studiepunten,
            aantalUren: this.#aantalUren
        };
    }
}