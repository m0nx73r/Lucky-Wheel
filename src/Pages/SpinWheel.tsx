import { memo, useState } from "react";
import LuckyWheel from "../Components/LuckyWheel";
import { SpeakerOff, SpeakerOn } from "../Components/Icons";
import spin from "../../src/assets/spins.png";
import bg from "../assets/spin-bg.jpg";

const SpinWheel = memo(() => {
  const [speakerOff, setSpeakerOff] = useState<boolean>(false);
  const [spins, setSpins] = useState<number>(3);

  const toggleSpeaker = () => {
    setSpeakerOff(!speakerOff);
  };

  const handleSpin = () => {
    if (spins > 0) {
      setSpins(spins - 1);
    }
  };

  const renderImages = () => {
    return Array.from({ length: spins }, (_, index) => (
      <img
        key={index}
        src={spin}
        alt={`Spin ${index + 1}`}
        className="h-8 "
      />
    ));
  };

  return (
    <div
      className="relative overflow-hidden min-h-screen flex flex-col  justify-center items-center "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute p-2 top-4 z-50 right-[38rem] cursor-pointer"
        onClick={toggleSpeaker}
      >
        {speakerOff ? <SpeakerOff /> : <SpeakerOn />}
      </div>

      <div>
        <LuckyWheel
          onSpin={handleSpin}
          remainingSpins={spins}
          speakerOff={speakerOff}
        />
      </div>

      <div className="text-sm mt-4  bg-[#1b5b67] p-2  rounded-lg w-52  flex flex-col items-center gap-4 font-semibold z-50 text-white mb-2 relative">
        {spins > 0 ? `${spins} Lucky Spins Available` : "No Spins Available"}
        <span className="flex flex-row items-center">{renderImages()}</span>
      </div>

    </div>
  );
});

export default SpinWheel;
