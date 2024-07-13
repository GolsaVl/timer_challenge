import { useState, useRef } from "react";

import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const time = useRef();
  const dialog = useRef();
  const [remaingTime, setRemaingTime] = useState(targetTime * 1000);

  const timeIsActive = remaingTime > 0 && remaingTime < targetTime * 1000;

  if (remaingTime <= 0) {
    dialog.current.open();
    clearInterval(time.current);
  }

  function handleStart() {
    time.current = setInterval(() => {
      setRemaingTime((preTime) => preTime - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(time.current);
    dialog.current.open();
  }

  function handleReset() {
    setRemaingTime(targetTime * 1000);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTimeValue={remaingTime}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second {timeIsActive > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timeIsActive ? handleStop : handleStart}>
            {timeIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timeIsActive ? "active" : undefined}>
          {timeIsActive ? "This is running ..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
