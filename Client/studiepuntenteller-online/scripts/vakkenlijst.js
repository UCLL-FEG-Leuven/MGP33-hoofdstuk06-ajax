import { Vak } from "./vak.js";

// Dit zal de key zijn die we gebruiken in de localStorage.
// Je kan de localStorage bekijken via Developer Tools - Application - Local storage
const localStorageKey = "vakkenLijst";

export class Vakkenlijst {
    #studentnummer;
    #vakken;

    constructor(studentnummer) {
        this.#studentnummer = studentnummer;
        this.#vakken = [];
    }

    async save() {
        let response = await fetch(`/api/studiepuntenteller/${this.#studentnummer}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.#vakken)
          });
          if (!response.ok) {
            throw "Er is iets misgelopen met het bewaren.";
          }
    }

    async load() {
        let response = await fetch(`/api/studiepuntenteller/${this.#studentnummer}`);
        if (!response.ok) {
            throw "Er is iets misgelopen met het ophalen.";
        }
        let vakkenAsArrayOfObjectLiterals = await response.json();
        this.#vakken = [];
        vakkenAsArrayOfObjectLiterals.forEach(vakAsObjectLiteral => {
            this.#vakken.push(new Vak(
                vakAsObjectLiteral.id,
                vakAsObjectLiteral.naam,
                vakAsObjectLiteral.studiepunten,
                vakAsObjectLiteral.aantalUren));
        });

        // Eens dat de vakken geladen zijn: ook direct tonen.
        this.#renderVakken();
    }

    render(element) {
        // Deze render zal de table renderen maar nog niet de vakken (die worden pas geladen bij het aanroepen van load()).
        let table =
            `<table id="vakkenlijst" class="table">
                <thead>
                    <tr>
                        <th>Vak</th>
                        <th>Studiepunten</th>
                        <th>Geschat aantal uren</th>
                        <th>Aantal uren</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <button id="save">Bewaren</button><button id="load">Laden</button>`;

        element.innerHTML = table;

        document.getElementById("save").addEventListener("click", async (evt) => {
            try {
                this.#resetErrors();
                await this.save();
            } catch  (e) {
                this.#showError(e);
            }            
        })

        document.getElementById("load").addEventListener("click", async (evt) => {
            try {
                this.#resetErrors();
                await this.load();
            } catch (e) {
                this.#showError(e)
            }            
        });
    }

    #renderVakken() {
        let tbody = document.querySelector("#vakkenlijst tbody");
        tbody.innerHTML = ""; // Indien render een zoveelste keer wordt aangeroepen: de rijen verwijderen en opnieuw aanmaken.
        for (let i = 0; i < this.#vakken.length; i++) {
            // Elke rij mag zichzelf dan 'renderen' in het HTML document.
            this.#vakken[i].render(tbody);
        }
    }

    #resetErrors() {
        document.getElementById("errors").style.visibility = "hidden";
        document.getElementById("errors").innerText = "";
    }

    #showError(error) {
        document.getElementById("errors").style.visibility = "unset";
        document.getElementById("errors").innerText = error;
    }
}