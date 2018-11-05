import React from 'react';
import { uniqueId } from 'lodash';

import { HUMAN_PLAYING, CHECKING_HUMAN_NOTE } from './state/status';

const Controls = ({ status, robotSequence, humanSequence }) => (
    <div className="controls">
        <button
            disabled={
                [CHECKING_HUMAN_NOTE, HUMAN_PLAYING].indexOf(status) > -11
            }
            onMouseDown={() => {
                robotSequence.play();
            }}
        >
            Replay
        </button>
        <ul className="progress-bar">
            {robotSequence.getNotes().map((note, i) => {
                if (humanSequence.getNotes()[i]) {
                    return (
                        <li
                            className="completion-dot"
                            key={`human-sequence${i}`}
                            style={{ background: note.background }}
                        >
                            &nbsp;
                        </li>
                    );
                } else {
                    return (
                        <li
                            className="completion-dot"
                            key={uniqueId()}
                            style={{
                                background: 'white',
                                border: '1px solid gray'
                            }}
                        >
                            &nbsp;
                        </li>
                    );
                }
            })}
        </ul>
    </div>
);

export default Controls;
