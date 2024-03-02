const factParagraph = document.querySelector("p");
const getFactButton = document.querySelector("button");

getFactButton.addEventListener("click", async () => {
    try {
        let response = await fetch("https://catfact.ninja/fact");
        let feit = await response.json();
        factParagraph.innerText = feit.fact;
    } catch (err) {
        factParagraph.innerText("Oei, dit liep mis: " + err);
    }
});