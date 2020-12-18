import { Client } from 'boardgame.io/react';
import {Nim} from "../nim/Nim";
import {NimBoard} from "../nim/NimBoard";
import {Local} from "boardgame.io/multiplayer";
import {MCTSBot} from "boardgame.io/ai";

let bots = {};
for (let i = 1; i < 2; i++) {
    bots[i + ''] = MCTSBot;
}
let multiplayer = Local({ bots });

const NimClient = Client({
    game: Nim,
    board: NimBoard,
    multiplayer: multiplayer
});

const NimApp = () => (
    <NimClient playerID="0" />
);

export default NimApp;