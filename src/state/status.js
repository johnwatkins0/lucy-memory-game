import { useState } from 'react';

export const PREGAME = 'pregame';
export const HUMAN_SHOULD_PLAY = 'human should play';
export const CHECKING_HUMAN_NOTE = 'checking human note';
export const HUMAN_PLAYING = 'human playing';
export const ROBOT_PLAYING = 'music playing';
export const ROBOT_SHOULD_PLAY = 'music should play';
export const FAILED = 'failed';

export const useStatus = () => {
    const [status, setStatus] = useState(PREGAME);

    return {
        status,
        setStatus
    };
};
