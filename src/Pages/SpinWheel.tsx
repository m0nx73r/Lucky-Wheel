import { memo, useState } from "react";
import LuckyWheel from "../Components/LuckyWheel";
import { SpeakerOff, SpeakerOn } from "../Components/Icons";
import spin from "../../src/assets/spin.png";
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
        className="h-12 md:h-14"
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

      <div className="mt-16">
        <LuckyWheel
          onSpin={handleSpin}
          remainingSpins={spins}
          speakerOff={speakerOff}
        />
      </div>

      <div className="text-sm mt-4  bg-[#002a74] p-3 md:p-4 rounded-lg w-60  flex flex-col items-center gap-4 font-semibold z-50 text-white mb-2 relative">
        {spins > 0 ? `${spins} Lucky Spins Available` : "No Spins Available"}
        <span className="flex flex-row items-center">{renderImages()}</span>
      </div>

      <div className="text-sm mt-3 z-20 p-3 md:p-4 rounded-lg max-w-md flex flex-col items-center gap-4 font-semibold bg-[#ffde41] text-[#002a74]  mb-4">
        FREE SPINS EVERYDAY
      </div>
    </div>
  );
});

export default SpinWheel;
