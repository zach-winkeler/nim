import { Client } from 'boardgame.io/react';
import {Local} from "boardgame.io/multiplayer";
import {MCTSBot} from "boardgame.io/ai";
import {Rook} from "../rook/Rook";
import {RookBoard} from "../rook/RookBoard";

let bots = {};
for (let i = 1; i < 2; i++) {
    bots[i + ''] = MCTSBot;
}
let multiplayer = Local({ bots });

const RookClient = Client({
    game: Rook,
    board: RookBoard,
    multiplayer: multiplayer
});

const RookApp = () => (
    <RookClient playerID="0" />
);

export default RookApp;