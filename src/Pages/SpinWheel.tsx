import { memo, useState } from "react";
import LuckyWheel from "../Components/LuckyWheel";
import { PaytmIcon, SpeakerOff, SpeakerOn } from "../Components/Icons";
import spin from "../../src/assets/spin.png";
import flower from "../assets/Flowers.png";

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
    <div className="relative overflow-hidden bg-[#4c0e30] min-h-screen flex flex-col items-center px-4 md:px-8">
      <div
        className="absolute p-2 top-4 right-4 md:top-6 md:right-6 cursor-pointer"
        onClick={toggleSpeaker}
      >
        {speakerOff ? <SpeakerOff /> : <SpeakerOn />}
      </div>

      <div className="relative">
        <img src={flower} alt="" className="md:h-72 " />
        <div className="bg-white w-28 md:w-36 flex justify-center items-center md:h-14 h-10 rounded-lg absolute md:top-8 top-5 border-4 border-[#ffde41] right-[35%]">
          {" "}
          <PaytmIcon />
        </div>
      </div>
      <span className="text-2xl absolute top-28 md:text-4xl font-semibold text-white p-4 mt-4 md:mt-8">
        Lucky Wheel
      </span>

        <LuckyWheel
          onSpin={handleSpin} // onspin function
          remainingSpins={spins} // handling remaining spins as spin will be disabled after 3
          speakerOff={speakerOff} // Pass the speakerOff state
        />

      <div className="text-base md:text-xl bg-[#002a74] p-3 md:p-4 rounded-lg w-full max-w-md flex flex-col items-center gap-4 font-semibold text-white mt-6 mb-4">
        {spins} Lucky Spin Available
        <img src={spin} alt="" className="h-12 md:h-14" />
      </div>
    </div>
  );
});

export default SpinWheel;
