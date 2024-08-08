import { memo, useState } from "react";
import LuckyWheel from "../Components/LuckyWheel";
import { SpeakerOff, SpeakerOn } from "../Components/Icons";

const SpinWheel = memo(() => {
  // local state for handling speaker
  const [speakerOff, setSpeakerOff] = useState<boolean>(false);
  // local state for handling number of spins
  const [spins, setSpins] = useState<number>(3);

  // handling state for speaker
  const toggleSpeaker = () => {
    setSpeakerOff(!speakerOff);
  };

  // handling spins
  const handleSpin = () => {
    if (spins > 0) {
      setSpins(spins - 1);
    }
  };

  return (
    <div className="relative bg-[#4c0e30] min-h-screen flex flex-col items-center">
      <div
        className="absolute p-4 top-4 right-4 cursor-pointer"
        onClick={toggleSpeaker}
      >
        {speakerOff ? <SpeakerOff /> : <SpeakerOn />}
      </div>

      <span className="text-4xl font-semibold text-white p-4">Lucky Wheel</span>

      <div className="text-2xl font-semibold text-white mb-4">
        Spins Left: {spins}
      </div>

      <LuckyWheel
        onSpin={handleSpin} // onspin functioon
        remainingSpins={spins} // hanbdling reaming spin as spin will be disabled after 3
        speakerOff={speakerOff} // Pass the speakerOff state
      />
    </div>
  );
});

export default SpinWheel;
