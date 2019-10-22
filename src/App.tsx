import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import Timer from './Timer/Timer';
import ToolBlock from './TololBlock/Toolblock';
import Controls from './Controls/Controls';
import useInterval from 'use-interval';

import './App.css';


interface IState {
  time?: number;
  sessionLength?: number;
  breakLength?: number;
  mode?: string;
  isActive?: boolean;
  isSessionPassed?: boolean;
  myAudio?: any

}
const seconds = 60;
const mSeconds = 1000;
const sound = "https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3";
const timeFormat = (time: number): number => {
  return time * seconds * mSeconds
}

const App: React.FC<IState> = () => {

  const [time, setTime] = useState(timeFormat(25));
  const [sessionLength, setSessionLength] = useState(0.2);
  const [breakLength, setBreakLength] = useState(0.2);
  const [mode, setMode] = useState('session');
  const [isActive, setIsActive] = useState(false);
  const [isSessionPassed, setIsSessionPassed] = useState(false);
  const myAudio = new Audio(sound);



  const handleAdjustment = (increment: boolean, type: string) => {
    let inc = (increment) ? +1 : -1;
    if ((sessionLength === 60 || breakLength === 60) && increment) return
    if ((sessionLength === 1 || breakLength === 1) && !increment) return
    else if (type === "session") {
      setSessionLength(sessionLength + inc)
    } else if (type === "break") {
      setBreakLength(breakLength + inc)
    }
  }

  useEffect(() => {
    if ((time === 0) && (mode === "session")) {
      setTime(timeFormat(breakLength));
      setMode("break");
      myAudio.play();
    }

    if ((time === 0) && (mode === "break")) {
      setTime(timeFormat(sessionLength));
      setMode("session");
    }
  }, [time, mode])


  const handleReset = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTime(timeFormat(25));
    setIsActive(false);
    setIsSessionPassed(false);

  }

  const setTimer = () => {
    setTime(sessionLength);
  }

  useInterval(() => { setTime((time) => time - mSeconds) }, isActive ? mSeconds : null)

  const handlePlayPause = () => {
    if (!isSessionPassed) {
      setTime(timeFormat(sessionLength));
      setIsActive(!isActive);
      setIsSessionPassed(true);
    } else {
      setIsActive(!isActive)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        Pomodoro Timer
      </header>
      <Timer mode={mode} timeDisplay={moment(time).format('mm:ss')} />
      <div className="Tool-section">
        <ToolBlock type="session" value={sessionLength} handleClick={handleAdjustment} />
        <ToolBlock type="break" value={breakLength} handleClick={handleAdjustment} />
      </div>
      <Controls active={isActive}
        handleReset={handleReset}
        handlePlayPause={handlePlayPause} />
    </div>
  );
}

export default App;
