import { useState, useRef, memo } from "react";
import WheelComponent from "./WheelComponent";
import gift from "../../src/assets/gift.gif";
import { CrossIcon } from "./Icons";

interface LuckyWheelProps {
  onSpin?: () => void; // Define the type of the onSpin callback
  remainingSpins: number; // type for remaining spins
  speakerOff: boolean; // handle speaker click
}

const LuckyWheel: React.FC<LuckyWheelProps> = memo(
  ({ onSpin, remainingSpins, speakerOff }) => {
    // local state for modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Type the state
    // handle the local state for setting prize
    const [prize, setPrize] = useState<string>(""); // Type the state

    // Create refs for the audio elements
    const spinSound = useRef<HTMLAudioElement>(null);
    const winSound = useRef<HTMLAudioElement>(null);

    // segement data
    const segments = [
      "500 Cashback Points",
      "100 Cashback Points",
      "20 Cashback Points",
      "5 Cashback Points",
      "10 Cashback Points",
      "10 Cashback Points",
    ];
    // segment colors
    const segColors = [
      "#f5496a",
      "#fec118",
      "#f5496a",
      "#fec118",
      "#f5496a",
      "#fec118",
    ];

    // handle the spin complete
    const onFinished = (winner: string) => {
      setPrize(winner);
      setIsModalOpen(true);
      if (onSpin) onSpin(); // Call the onSpin callback
      if (!speakerOff && winSound.current) {
        winSound.current.play();
      } // Play win sound
    };

    // handle on spin sound
    const handleSpin = () => {
      if (!speakerOff && spinSound.current) {
        spinSound.current.play();
      } // Play spin sound
    };

    // handle modal state
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    return (
      <div className="flex flex-col items-center">
        <WheelComponent
          segments={segments} // segemtn data
          audioStatus={speakerOff} // passing th audio state as boolean
          segColors={segColors} // passing the segment colors
          winningSegment="" // winning segment can be used later
          onFinished={onFinished} // handle on spin complete
          onSpin={handleSpin} // Pass the handleSpin function to play the spin sound
          primaryColor="#002a74" // color for the innter circle
          contrastColor="black" // segment color
          buttonText="TAP" // btn twext
          isOnlyOnce={remainingSpins <= 0} // Disable spin if no spins left
          size={190} // size fo the wheel
          upDuration={50} // duration
          downDuration={700} // duration for spin
        />
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
            <div className="bg-[#1a1649] relative p-4 md:p-6 w-full max-w-md flex flex-col items-center rounded-lg shadow-lg">
              <p className="text-lg text-white font-semibold">YOU WON</p>
              {/* handle the amount  */}
              <p className="text-xl md:text-2xl font-bold text-[#fdbf15]">
                {prize.split(" ")[0]}
              </p>
              {/* handle the text after amount */}
              <p className="text-lg md:text-xl text-white font-semibold">
                {prize.split(" ").slice(1).join(" ")}
              </p>
              {/* gif for modal */}
              <img src={gift} alt="Gift" className="h-40 md:h-60 mt-4" />
              <button
                className="bg-gray-400 absolute right-4 top-3 rounded-full text-white p-1 md:p-2"
                onClick={handleCloseModal}
              >
                <CrossIcon />
              </button>
            </div>
          </div>
        )}
        {/* Audio elements */}
        <audio ref={spinSound} src="../../public/spin.mp3" preload="auto" />
        <audio ref={winSound} src="../../public/win.mp3" preload="auto" />
      </div>
    );
  }
);

export default LuckyWheel;
