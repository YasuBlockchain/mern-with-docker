import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { getDecksController } from "./controllers/getDecksController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";

const PORT = 2665;

const app = express();

// https://earthly.dev/blog/mongodb-docker/
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

mongoose.connect(`mongodb://${process.env.MONGO_URL}`).then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});