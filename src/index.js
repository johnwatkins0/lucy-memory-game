import React from 'react';
import ReactDOM from 'react-dom';
import Board from './board';

import './index.css';

console.log(window.AudioContext);

const root = document.getElementById('root');
ReactDOM.render(<Board />, root);
