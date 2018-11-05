import { useState } from 'react';

import NoteSequence from '../notes/note-sequence';

export const useSequence = () => {
    const [sequence] = useState(new NoteSequence());
    return {
        sequence
    };
};
