try {
    let response = await fetch("/time");
    let objectWithTime = await response.json();
    document.getElementById("time").innerText = objectWithTime.time;
} catch (err) {
    console.error(err);
}