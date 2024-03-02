// in package.json wordt via type="module" aangegeven dat we ES6 module syntax gebruiken
import express from "express";
import { join } from "path";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

import { ChatMessage } from "./chat-message.js";

import { Vak } from "./vak.js";

import __dirname from "./__dirname.js";

// Met livereload zal de browser automatisch refreshen van zodra er een wijziging is aan de backend of frontend.
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(join(__dirname, '..', 'Client')); // Deze is nodig om bij frontend changes ook een refresh te doen.
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

const app = express();

// De poort is niet meer hardgecodeerd: de de host van deze server kan zelf bepalen op welke poort het moet draaien.
// Als er geen poort wordt doorgegeven dan zal de server standaard op poort 2024 draaien.
const port = process.env.PORT ? process.env.PORT : 3006;

// De livereload middleware registreren.
app.use(connectLiveReload());

// De static files middleware registreren
app.use("/", express.static(join(__dirname, '..', 'Client')));

// JSON middleware enablen
app.use(express.json());

// API VOOR CHAT APP - START
let messages = [
    new ChatMessage('system',' Server is up')
];

app.get('/api/chat', (req, res) => {
    res.json(messages);
});
  
app.post('/api/chat', (req, res) => {
    // het object in de body is een object 
    // literal en dus geen object van de class
    // ChatMessage. Vandaar eerst een ‘new’.
    let chatMessage = new ChatMessage(
      req.body.nickname,
      req.body.message
    );
    messages.push(chatMessage);
    res.status(204).end();
});
// API VOOR CHAT APP - END

// API VOOR STUDIEPUNTENTELLER ONLINE - START
let studentenEnHunTellingen = new Map();

app.get('/api/studiepuntenteller/:studentnummer', (req, res) => {
    let studentnummer = req.params.studentnummer;
    if (studentenEnHunTellingen.has(studentnummer)) {
        // Is de student al gekend bij de backend?
        let vakken = studentenEnHunTellingen.get(studentnummer);
        res.json(vakken);
    } else {
        // Is de student nog niet gekend bij de backend?
        let vakken = [];
        vakken.push(new Vak(0, "IT essentials", 3, 0));
        vakken.push(new Vak(1, "IT landscape", 3, 0));
        vakken.push(new Vak(2, "Databases basis", 4, 0));
        vakken.push(new Vak(3, "Databases gevorderd", 4, 0));
        vakken.push(new Vak(4, "Programmeren basis", 9, 0));
        vakken.push(new Vak(5, "Programmeren gevorderd", 6, 0));
        vakken.push(new Vak(6, "Frontend basis", 7, 0));
        vakken.push(new Vak(7, "Frontend gevorderd", 5, 0));
        vakken.push(new Vak(8, "Backend 1", 4, 0));
        vakken.push(new Vak(9, "Verkenning van de werkplek", 4, 0));
        vakken.push(new Vak(10, "Communicatievaardigheden", 3, 0));
        vakken.push(new Vak(11, "Participatie op de werkplek 1", 6, 0));
        vakken.push(new Vak(12, "Teamvaardigheden", 3, 0));
        studentenEnHunTellingen.set(studentnummer, vakken);        
        res.json(vakken);
    }
});

app.post('/api/studiepuntenteller/:studentnummer', (req, res) => {
    let studentnummer = req.params.studentnummer;
    // Opgelet: in res.body zit een array van object literals. Het zijn dus geen objecten van de Vak class! 
    // Dat kan hier niet zoveel kwaad omdat de backend na 'constructie' in de app.get() geen nood meer heeft aan de Vak class.
    studentenEnHunTellingen.set(studentnummer, req.body);  
});
// API VOOR STUDIEPUNTENTELLER ONLINE - END


app.listen(port, () => {
    console.log(`Chat server listening on port ${port}`);
});