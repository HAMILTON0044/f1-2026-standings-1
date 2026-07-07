import { useRef } from "react";
import leclercRadioClip from "../assets/i-am-stupid-leclarc.mp3";

export function RadioClipButton() {
  const audioRef = useRef(null);

  function playRadioClip() {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  return (
    <div className="radio-clip">
      <button
        className="radio-clip__button"
        onClick={playRadioClip}
        type="button"
        aria-label="播放勒克莱尔 I am stupid 车队无线电"
        title="播放勒克莱尔车队无线电"
      >
        <span className="radio-clip__mark" aria-hidden="true">
          STUPID
        </span>

      </button>

      <audio ref={audioRef} src={leclercRadioClip} preload="auto" />
    </div>
  );
}
