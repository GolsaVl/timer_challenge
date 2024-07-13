import { forwardRef, useImperativeHandle, useRef } from "react";

const ResulModel = forwardRef(function ResaulModel(
  { targetTime, remainingTimeValue, onReset },
  ref
) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  let userLost = remainingTimeValue <= 0;
  let formattedRemainingTime = (remainingTimeValue / 1000).toFixed(2);
  const score = Math.round((1 - formattedRemainingTime / targetTime) * 100);

  return (
    <dialog ref={dialog} className="result-modal">
      <h2>{userLost ? "You lost!" : `Your Score: ${score}`}</h2>
      <p>
        The target time was <strong>{targetTime}</strong> seconds.
      </p>
      <p>
        You stop the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResulModel;
