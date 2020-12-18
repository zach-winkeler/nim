import { Client } from 'boardgame.io/react';
import {Local} from "boardgame.io/multiplayer";
import {MCTSBot} from "boardgame.io/ai";
import {Notakto} from "../notakto/Notakto";
import {NotaktoBoard} from "../notakto/NotaktoBoard";

let bots = {};
for (let i = 1; i < 2; i++) {
    bots[i + ''] = MCTSBot;
}
let multiplayer = Local({ bots });

const NotaktoClient = Client({
    game: Notakto,
    board: NotaktoBoard,
    multiplayer: multiplayer
});

const NotaktoApp = () => (
    <NotaktoClient playerID="0" />
);

export default NotaktoApp;