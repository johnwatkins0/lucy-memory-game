import React from 'react';
import randomHexColor from 'random-hex-color';
import Tone from 'tone';

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
            userInteracted: false,
            checkIndex: 0,
            failed: false
        };
    }
    constructor(props) {
        super(props);

        this.state = Board.getInitialState();

        this.notes = [];

        this.play = this.play.bind(this);
        this.restart = this.restart.bind(this);
        this.updateSequence = this.updateSequence.bind(this);
    }

    componentDidMount() {
        this.updateSequence();
    }

    restart() {
        this.setState(Board.getInitialState(), this.updateSequence);
    }

    updateSequence() {
        const sequence = this.state.sequence.map(el => el);
        sequence.push(cells[Math.floor(Math.random() * cells.length)]);

        this.setState(
            {
                checkIndex: 0,
                sequence,
                userInteracted: false
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

                i += 1;
                if (i < this.state.sequence.length) {
                    player();
                }
            }, 500);
        };
        player();
    }

    handleClick(cell, i) {
        this.setState({
            userInteracted: true
        });

        synth.triggerAttackRelease(cell.note, '8n');

        if (cell.el.id === this.state.sequence[this.state.checkIndex].el.id) {
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
                            onClick={() => {
                                this.handleClick(cell, i);
                            }}
                            style={{ background: cell.color }}
                        >
                            &nbsp;
                        </button>
                    ))}
                </main>
                <div className="controls">
                    <button
                        disabled={this.state.userInteracted}
                        onClick={this.play}
                    >
                        Play
                    </button>
                </div>
                {this.state.failed && (
                    <div className="failure-overlay">
                        <h1>Game Over</h1>
                        <button onClick={this.restart}>Try again?</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Board;
