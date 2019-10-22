import React from 'react';


interface ITimerProps {
    mode: string;
    timeDisplay: string;
}
const Timer: React.FC<ITimerProps> = ({ mode, timeDisplay }) => {
    return (
        <div>
            <h1 id="timer-label">{(mode === "session") ? "Session" : "Break"}</h1>
            <h1 id="time-left">{timeDisplay}</h1>
        </div>)

}

export default Timer;





