// in package.json wordt via type="module" aangegeven dat we ES6 module syntax gebruiken
import express from "express";
import { join } from "path";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";

import { ChatMessage } from "./chat-message.js";

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
  
app.listen(port, () => {
    console.log(`Chat server listening on port ${port}`);
});