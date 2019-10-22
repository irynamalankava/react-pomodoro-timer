import React from 'react';

interface IControlsProps {
    active: boolean;
    handleReset: () => void;
    handlePlayPause: () => void;
}
const Controls: React.FC<IControlsProps> = ({ active, handleReset, handlePlayPause }) => {
    return (
        <div>
            <button id="start_stop" onClick={handlePlayPause}>{active ? <span>&#10074;&#10074;</span> : <span>&#9658;</span>}</button>
            <button id="reset" onClick={handleReset}>&#8635;</button>
        </div>

    )
}

export default Controls;