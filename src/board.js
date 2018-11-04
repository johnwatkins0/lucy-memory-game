import React from 'react';
import randomHexColor from 'random-hex-color';
import Tone from 'tone';
import StartAudioContext from 'startaudiocontext';

const synth = new Tone.Synth().toMaster();

const cells = [
    { note: 'C4', color: randomHexColor() },
    { note: 'D4', color: randomHexColor() },
    { note: 'E4', color: randomHexColor() },
    { note: 'F4', color: randomHexColor() },
    { note: 'G4', color: randomHexColor() },
    { note: 'A4', color: randomHexColor() },
    { note: 'B4', color: randomHexColor() },
    { note: 'C5', color: randomHexColor() },
    { note: 'D5', color: randomHexColor() }
];

class Board extends React.Component {
    static getInitialState() {
        return {
            sequence: [],
            userIsGoing: false,
            checkIndex: 0,
            failed: false,
            started: false
        };
    }
    constructor(props) {
        super(props);

        this.state = Board.getInitialState();

        this.notes = [];

        this.play = this.play.bind(this);
        this.restart = this.restart.bind(this);
        this.updateSequence = this.updateSequence.bind(this);
        this.start = this.start.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onPlayButtonClick = this.onPlayButtonClick;
        this.startOrRestart = this.startOrRestart.bind(this);
    }

    start() {
        this.setState({ started: true }, this.updateSequence);
    }

    restart() {
        this.setState(
            { ...Board.getInitialState(), started: true },
            this.updateSequence
        );
    }

    updateSequence() {
        const sequence = this.state.sequence
            .map(el => el)
            .concat([cells[Math.floor(Math.random() * cells.length)]]);

        this.setState(
            {
                checkIndex: 0,
                sequence,
                userIsGoing: false
            },
            this.play
        );
    }

    play() {
        let i = 0;
        const player = () => {
            synth.triggerAttackRelease(this.state.sequence[i].note, '8n');

            this.state.sequence[i].el.classList.add('playing');

            setTimeout(() => {
                this.state.sequence[i].el.classList.remove('playing');
            }, 300);

            setTimeout(() => {
                i += 1;
                if (i < this.state.sequence.length) {
                    player();
                }
            }, 500);
        };
        player();
    }

    handleClick(el) {
        if (!this.state.userIsGoing) {
            this.setState({
                userIsGoing: true
            });
        }

        const cell = cells.filter(c => c.el.id === el.id)[0];
        synth.triggerAttackRelease(cell.note, '8n');

        if (el.id === this.state.sequence[this.state.checkIndex].el.id) {
            this.setState({
                checkIndex: this.state.checkIndex + 1
            });
            setTimeout(() => {
                if (this.state.checkIndex === this.state.sequence.length) {
                    this.updateSequence();
                }
            }, 1000);
        } else {
            this.setState({ failed: true });
        }
    }

    startOrRestart() {
        if (this.state.started) {
            this.restart();
        } else {
            this.start();
        }
    }

    onButtonClick(el) {
        StartAudioContext(Tone.context, event.target, () => {
            this.handleClick(el);
        });
    }

    onPlayButtonClick(event) {
        event.preventDefault();
        StartAudioContext(Tone.context, event.target, this.play);
    }

    render() {
        return (
            <div className="wrapper">
                <main className="grid">
                    {cells.map((cell, i) => (
                        <button
                            id={`cell-${i}`}
                            ref={el => {
                                cells[i].el = el;
                            }}
                            className="cell"
                            key={cell.note}
                            onTouchStart={event => {
                                event.preventDefault();
                                this.onButtonClick(event.target);
                            }}
                            onClick={event => {
                                event.preventDefault();
                                this.onButtonClick(event.target);
                            }}
                            style={{ background: cell.color }}
                        >
                            &nbsp;
                        </button>
                    ))}
                </main>
                <div className="controls">
                    <button
                        disabled={this.state.userIsGoing}
                        onClick={this.onPlayButtonClick}
                        onTouchStart={this.onPlayButtonClick}
                    >
                        Play
                    </button>
                </div>
                {(!this.state.started || this.state.failed) && (
                    <div className="failure-overlay">
                        <h1>
                            {this.state.started
                                ? 'Game Over'
                                : 'Lucy Memory Game'}
                        </h1>
                        <button
                            onClick={this.startOrRestart}
                            onTouchStart={this.startOrRestart}
                        >
                            {this.state.started ? 'Try again?' : 'Start'}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Board;
