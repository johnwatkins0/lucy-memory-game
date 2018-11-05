import { useState } from 'react';
import randomHexColor from 'random-hex-color';

const NOTES = 'CDEFGAB';
let CELLS;

function* noteGenerator() {
    let index = 0;
    let scale = 3;

    const getNextNote = () => {
        if (index >= 7) {
            index = 0;
            scale += 1;
        }

        const note = `${NOTES.charAt(index)}${scale}`;

        index += 1;

        return note;
    };

    while (true) {
        yield getNextNote();
    }
}

export function getCells(reset = false) {
    if (!CELLS || reset === true) {
        const notes = noteGenerator();
        CELLS = Array(9)
            .fill()
            .map((_, index) => {
                const note = notes.next().value;
                const background = randomHexColor();
                return {
                    note,
                    background,
                    index
                };
            });
    }

    return CELLS;
}

export const useCells = cells => useState(cells);
