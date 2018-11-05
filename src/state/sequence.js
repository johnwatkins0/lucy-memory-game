import { useState, useEffect } from 'react';

import NoteSequence from '../notes/note-sequence';

export const getNewRobotNote = () => {
    const cells = getCells();
    const cell = cells[Math.floor(Math.random() * cells.length)];
    cell.el = document.getElementById(`cell-${cell.index}`);
    return cell;
};

export const useSequence = () => {
    const [sequence] = useState(new NoteSequence());
    return {
        sequence
    };
};
