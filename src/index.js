import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Board from './board';
import { random } from 'lodash';

import { getCells } from './state/cells';
import {
    useStatus,
    ROBOT_PLAYING,
    ROBOT_SHOULD_PLAY,
    HUMAN_SHOULD_PLAY,
    HUMAN_PLAYING,
    CHECKING_HUMAN_NOTE,
    FAILED
} from './state/status';
import { useSequence } from './state/sequence';

import Controls from './controls';
import HomeScreen from './home-screen';

import './index.css';

const Wrapper = () => {
    const humanSequence = useSequence().sequence;
    const robotSequence = useSequence().sequence;
    const { status, setStatus } = useStatus();

    useEffect(async () => {
        const cells = [...document.querySelectorAll('.cell')];
        switch (status) {
        case ROBOT_SHOULD_PLAY:
            robotSequence.addFromElement(
                cells[random(0, cells.length - 1)]
            );
            setStatus(ROBOT_PLAYING);
            await robotSequence.play();
            setStatus(HUMAN_SHOULD_PLAY);

            break;
        case FAILED:
            robotSequence.clear();
            humanSequence.clear();
            break;
        }
    });

    async function onNoteClick(event) {
        if (status !== HUMAN_PLAYING) {
            setStatus(HUMAN_PLAYING);
        }

        const el = event.target;
        humanSequence.addFromElement(el);
        await humanSequence.play(humanSequence.length - 1);

        setStatus(CHECKING_HUMAN_NOTE);

        if (robotSequence.getNoteAtIndex(humanSequence.length - 1).el !== el) {
            setStatus(FAILED);
            return;
        }

        setStatus(HUMAN_PLAYING);

        if (humanSequence.length === robotSequence.length) {
            humanSequence.clear();
            setTimeout(() => {
                setStatus(ROBOT_SHOULD_PLAY);
            }, 500);
        }
    }

    return (
        <Fragment>
            <Board cells={getCells()} onNoteClick={onNoteClick} />
            <Controls
                status={status}
                robotSequence={robotSequence}
                humanSequence={humanSequence}
            />
            <HomeScreen status={status} setStatus={setStatus} />
        </Fragment>
    );
};

const root = document.getElementById('root');
ReactDOM.render(<Wrapper />, root);
