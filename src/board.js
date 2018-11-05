import React from 'react';

const Board = ({ cells, onNoteClick }) => {
    return (
        <div className="wrapper">
            <main className="grid">
                {cells.map(({ note, background }, i) => {
                    return (
                        <button
                            key={`cell-${i}`}
                            id={`cell-${i}`}
                            data-key={i}
                            data-note={note}
                            data-background={background}
                            className="cell"
                            onMouseDown={onNoteClick}
                            style={{ background }}
                        />
                    );
                })}
            </main>
        </div>
    );
};

export default Board;
