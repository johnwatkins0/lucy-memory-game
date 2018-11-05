import React from 'react';

import { PREGAME, ROBOT_SHOULD_PLAY, FAILED } from './state/status';

const HomeScreen = ({ status, setStatus }) =>
    [PREGAME, FAILED].indexOf(status) > -1 && (
        <div className="failure-overlay">
            <h1>{FAILED === status ? 'Game Over' : 'Lucy Memory Game'}</h1>
            <button
                onMouseDown={() => {
                    setStatus(ROBOT_SHOULD_PLAY);
                }}
            >
                {FAILED === status ? 'Try again?' : 'Start'}
            </button>
        </div>
    );

export default HomeScreen;
