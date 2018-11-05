import Note from './note';

export default class NoteSequence {
    constructor(notes = []) {
        this.notes = notes;
    }

    get length() {
        return this.getNotes().length;
    }

    play(index) {
        return new Promise(resolve => {
            if (index) {
                this.getNotes()[index].play();
                resolve();
                return;
            }

            const player = notes => {
                const note = notes.shift();
                note.play();

                if (note.hasLinkedElement()) {
                    note.addActiveClass();
                    setTimeout(note.removeActiveClass, 300);
                }

                setTimeout(() => {
                    if (notes.length > 0) {
                        player(notes);
                    } else {
                        resolve();
                    }
                }, 500);
            };

            if (this.length > 0) {
                player([...this.getNotes()]);
            }
        });
    }

    getNotes() {
        return this.notes;
    }

    addFromElement(el) {
        this.getNotes().push(new Note(el.dataset, el));
    }

    getNoteAtIndex(index) {
        return this.getNotes()[index];
    }

    clear() {
        this.notes = [];
    }
}
