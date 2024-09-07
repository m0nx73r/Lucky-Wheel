import { useState, useRef, memo } from "react";
import WheelComponent from "./WheelComponent";
// import { CrossIcon } from "./Icons";

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
      "5 Gram Gold Bar",
      "Better Luck Next Time",
      "10 Gram Gold Bar",
      "Better Luck Next Time",
      "2 Gram Gold Bar",
      "Better Luck Next Time",
    ];
    // segment colors
    const segColors = [
      "#fee015",
      "#fe64c1",
      "#fee015",
      "#fe64c1",
      "#fee015",
      "#fe64c1",
    ];

    const getWinningSegment = () => {
      if (remainingSpins === 3 || remainingSpins === 2) {
        return "Better Luck Next Time";
      } else if (remainingSpins === 1) {
        const prizes = ["5 Gram Gold Bar", "10 Gram Gold Bar", "2 Gram Gold Bar"];
        return prizes[Math.floor(Math.random() * prizes.length)];
      } else {
        return "Better Luck Next Time";
      }
    };

    const onFinished = (winner: string) => {
      setPrize(winner);
      setIsModalOpen(true);
      if (onSpin) onSpin();
      if (!speakerOff && winSound.current) {
        winSound.current.play();
      }
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
          winningSegment={getWinningSegment()} // winning segment can be used later
          onFinished={onFinished} // handle on spin complete
          onSpin={handleSpin} // Pass the handleSpin function to play the spin sound
          primaryColor="#002a74" // color for the innter circle
          contrastColor="black" // segment color
          buttonText="TAP" // btn twext
          isOnlyOnce={remainingSpins <= 0} // Disable spin if no spins left
          size={150} // size fo the wheel
          upDuration={50} // duration
          downDuration={700} // duration for spin
        />
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-blue-900 bg-opacity-50 z-10 p-4">
            <div className="relative py-12 w-5/6 max-w-md flex flex-col items-center rounded-2xl shadow-lg backdrop-blur-lg bg-blue-900 border border-white/30">
            {
              prize.split(" ")[0] != "Better"  ? 
              ( <div className="z-50">
                <img src="/1.png" alt="" className="w-12 h-12 absolute top-14 right-10"/>
                <img src="/2.png" alt="" className="w-12 h-12 absolute top-14 left-10"/>
                <img src="/3.png" alt="" className="w-12 h-12 absolute top-48 right-10"/>
                <img src="/4.png" alt="" className="w-12 h-12 absolute top-48 left-10"/>
              </div>)
              : ""
            }
           
              <p className="text-white font-bold text-2xl">{prize.split(" ")[0] == "Better" ? "Better Luck Next Time" : "YOU WON"}</p>
              {/* handle the amount  */}
              <p className="text-2xl font-bold text-[#a3ec17]">
                {
                  prize.split(" ")[0] !== "Better" ? (
                    `₹${new Intl.NumberFormat('en-IN').format(parseInt(prize.split(" ")[0]) * 7658.6)}`
                  ) : (
                    ""
                  )
                }
              </p>


              {/* handle the text after amount */}
              <p className="text-lg md:text-xl text-white font-semibold">
                {
                  prize.split(" ")[0] !== "Better" ? (
                    <>Worth of Gold Bar <span className="text-[#a3ec17]">({new Intl.NumberFormat('en-IN').format(parseInt(prize.split(" ")[0]))}g)</span></>
                  ) : (
                    <div className="pt-2"></div>
                  )
                }
              </p>

              {/* gif for modal */}

              {prize.split(" ")[0] !== "Better" && (
                <img src={`prize_${prize.split(" ")[0]}g.png`} alt="Gift" className="h-40 md:h-60 mt-4" />
              )}
              {/* <button
                className="bg-gray-400 absolute right-4 top-3 rounded-full text-white p-1 md:p-2"
                onClick={handleCloseModal}
              >
                <CrossIcon />
              </button> */}
              <a
                target="_self"
                href={prize.split(" ")[0] == "Better" ? "#" : "/locker"}
                onClick={() => {
                  const prizeValue = prize.split(" ")[0]; // Ensure `prize` is defined and is a string
                  localStorage.setItem("prize", (parseInt(prizeValue)).toString());
                  handleCloseModal();
                }}
              >
                <button className="text-xl mt-6 border-[#1a1649] px-4 py-1 rounded-xl bg-[#00bcfc] md:text-2xl font-bold text-white">
                  {prize.split(" ")[0] == "Better" ? "Spin Again" : "Get Delivery"}
                </button>
              </a>
            </div>
          </div>

        )}
        {/* Audio elements */}
        <audio ref={spinSound} src="/spin.mp3" preload="auto" />
        <audio ref={winSound} src="/win.mp3" preload="auto" />
      </div>
    );
  }
);

export default LuckyWheel;
