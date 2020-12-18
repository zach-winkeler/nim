import { INVALID_MOVE } from 'boardgame.io/core';
import {getRandomInt} from "../../util/Random";
import {range} from "../../util/Range";

const MIN_PILES = 3;
const MAX_PILES = 10;
const MAX_PILE_HEIGHT = 10;

function isVictory(G) {
    return G.piles.every((n) => n === 0);
}

function randomInitialPiles() {
    let piles = []
    const numPiles = getRandomInt(MIN_PILES+1, MAX_PILES+1);
    // eslint-disable-next-line no-unused-vars
    for (const _ of range(numPiles)) {
        piles.push(getRandomInt(1,MAX_PILE_HEIGHT + 1))
    }
    return piles;
}

export const Nim = {
    name: 'Nim',

    setup: (ctx, setupData) => ({ piles: randomInitialPiles() }),

    turn: {
        moveLimit: 1,
    },

    moves: {
        takeChips: (G, ctx, pile, numChips) => {
            if (numChips > G.piles[pile]) {
                return INVALID_MOVE;
            } else if (numChips < 1) {
                return INVALID_MOVE;
            }
            G.piles[pile] -= numChips;
        },
    },

    endIf: (G, ctx) => {
        if (isVictory(G)) {
            return { winner: ctx.currentPlayer };
        }
    },

    ai: {
        enumerate: (G, ctx) => {
            let moves = [];
            for (const [i, numChips] of G.piles.entries()) {
                for (const j of range(numChips)) {
                    moves.push({move: 'takeChips', args: [i,j+1]});
                }
            }
            return moves;
        }
    }
};