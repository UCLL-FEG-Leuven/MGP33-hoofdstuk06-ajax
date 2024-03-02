import { Vakkenlijst } from "./vakkenlijst.js";

const form = document.querySelector("form");
const studentnummerInput = document.getElementById("studentnummer");
const section = document.querySelector("section");
form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    if (studentnummerInput.value) {
        let vakkenlijst = new Vakkenlijst(studentnummerInput.value);
        vakkenlijst.load();
        
        form.style.visibility = "hidden";
        section.style.visibility = "unset";
        vakkenlijst.render(section);
    }
})