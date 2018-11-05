import Tone from 'tone';
const synth = new Tone.AMSynth().toMaster();

export default class Note {
    constructor(data, el) {
        this.el = el || null;
        ['note', 'background', 'index'].forEach(key => {
            this[key] = data[key] || null;
        });

        this.addActiveClass = this.addActiveClass.bind(this);
        this.removeActiveClass = this.removeActiveClass.bind(this);
    }

    hasLinkedElement() {
        return !!this.el;
    }

    addActiveClass() {
        this.el.classList.add('playing');
    }

    removeActiveClass() {
        this.el.classList.remove('playing');
    }

    play() {
        synth.triggerAttackRelease(this.note, '8n');
    }
}
