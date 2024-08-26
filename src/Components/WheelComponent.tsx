import { FC, memo, useEffect, useRef, useState } from "react";

// types
interface WheelComponentProps {
  segments: string[];
  segColors: string[];
  winningSegment: string;
  onFinished: (segment: string) => void;
  onSpin?: () => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  width?: number;
  height?: number;
  audioStatus?: boolean;
}

// memo for reducing the re-renders
const WheelComponent: FC<WheelComponentProps> = memo(
  ({
    segments,
    segColors,
    winningSegment,
    onFinished,
    primaryColor,
    contrastColor,
    onSpin,
    buttonText,
    audioStatus,
    isOnlyOnce = true,
    size = 290,
    upDuration = 1000,
    downDuration = 100,
  }) => {
    // local state for handling the completion of spin
    const [isFinished, setFinished] = useState(false);
    // variables
    let currentSegment = "";
    let isStarted = false;
    let timerHandle = 0;
    const timerDelay = segments.length;
    let angleCurrent = 0;
    let angleDelta = 0;
    let canvasContext: CanvasRenderingContext2D | null = null;
    let maxSpeed = Math.PI / segments.length;
    const upTime = segments.length * upDuration;
    const downTime = segments.length * downDuration;
    let spinStart = 0;
    let frames = 0;
    const centerX = 200;
    const centerY = 200;
    // audio
    const spinSound = useRef<HTMLAudioElement>(
      new Audio("../../public/spin.mp3")
    );

    // hook to handle the mounting of the hook
    useEffect(() => {
      wheelInit();
      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 0);
    });

    // function for initialising the canvas as well as the wheel
    const wheelInit = () => {
      initCanvas();
      wheelDraw();
    };

    // canvas initialising
    const initCanvas = () => {
      const canvas = document.getElementById("canvas") as HTMLCanvasElement;
      canvasContext = canvas.getContext("2d");

      // Attach click event directly to the canvas element
      canvas.onclick = function () {
        if (!isFinished || !isOnlyOnce) {
          spin();
        }
      };
    };

    // handle spin
    const spin = () => {
      // if is not started
      if (!isStarted) {
        isStarted = true;
        if (timerHandle === 0) {
          // start spin according to the time
          spinStart = new Date().getTime();
          // speed of the spin pi / 6
          maxSpeed = Math.PI / segments.length;
          frames = 0;
          // Start the spin timer
          timerHandle = window.setInterval(onTimerTick, timerDelay);
          // Handle the spin start (play sound, call onSpin)
          handleSpinStart();
        }
      }
    };

    // Handle the spin start (sound, callback)
    const handleSpinStart = () => {
      if (onSpin) onSpin(); // Call onSpin when the spinning starts
      if (!audioStatus && spinSound.current) spinSound.current.play(); // Play spin sound
    };

    // Timer tick handler for spinning
    const onTimerTick = () => {
      frames++;
      draw(); // Redraw the wheel on each tick
      const duration = new Date().getTime() - spinStart; // Calculate the duration since spin started
      let progress = 0;
      let finished = false;

      if (duration < upTime) {
        progress = duration / upTime;
        angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2); // Increase speed using sine function
      } else {
        if (winningSegment) {
          if (currentSegment === winningSegment && frames > segments.length) {
            progress = duration / upTime;
            angleDelta =
              maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2); // Decelerate smoothly
            progress = 1;
          } else {
            progress = duration / downTime;
            angleDelta =
              maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2); // Continue deceleration
          }
        } else {
          progress = duration / downTime;
          if (progress >= 0.8) {
            angleDelta =
              (maxSpeed / 1.2) *
              Math.sin((progress * Math.PI) / 2 + Math.PI / 2); // Further slow down
          } else if (progress >= 0.98) {
            angleDelta =
              (maxSpeed / 2) * Math.sin((progress * Math.PI) / 2 + Math.PI / 2); // Almost stop
          } else {
            angleDelta =
              maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2); // Continue slowing down
          }
        }
        if (progress >= 1) finished = true; // Mark as finished if progress is complete
      }

      angleCurrent += angleDelta;  // Update the current angle
      while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2; // Normalize the angle
      if (finished) {
        setFinished(true);  // Mark the spin as finished
        onFinished(currentSegment);   // Call the onFinished callback with the winning segment
        clearInterval(timerHandle);  // Clear the spin timer
        timerHandle = 0;
        angleDelta = 0;
      }
    };

      // Draw the entire wheel and needle
    const wheelDraw = () => {
      clear(); // Clear the canvas
      drawWheel(); // Draw the wheel segments
      drawNeedle(); // Draw the needle
    };

     // Redraw the wheel and needle on each frame
    const draw = () => {
      clear(); // Clear the canvas
      drawWheel();  // Draw the wheel segments
      drawNeedle(); // Draw the needle
    };

     // Draw a single segment of the wheel
    const drawSegment = (key: number, lastAngle: number, angle: number) => {
      const ctx = canvasContext;
      const value = segments[key];
      if (ctx) {
        ctx.save();

        // Draw the segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, size, lastAngle, angle, false);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fillStyle = segColors[key];
        ctx.fill();
        ctx.stroke();

        // Save the canvas state for text drawing
        ctx.save();

        // Calculate the middle angle and text position
        const middleAngle = (lastAngle + angle) / 2;
        const textX = centerX + size * 0.75 * Math.cos(middleAngle); // Adjust text position towards the outer edge
        const textY = centerY + size * 0.75 * Math.sin(middleAngle); // Adjust text position towards the outer edge

        // Move the canvas context to the text center
        ctx.translate(textX, textY);

        // Rotate the canvas context to align the text perpendicularly
        const rotationAngle = middleAngle + Math.PI / 2;
        ctx.rotate(rotationAngle);

        // Draw the text
        ctx.fillStyle = contrastColor || "white";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(value, 0, 0);

        // Restore the canvas state
        ctx.restore();
        // ctx.restore();
      }
    };

    // draw the wheel
    const drawWheel = () => {
      const ctx = canvasContext;
      let lastAngle = angleCurrent;
      const len = segments.length;
      const PI2 = Math.PI * 2;
      if (ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = primaryColor || "black";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.font = "1em sans-serif";
        for (let i = 1; i <= len; i++) {
          const angle = PI2 * (i / len) + angleCurrent;
          drawSegment(i - 1, lastAngle, angle);
          lastAngle = angle;
        }

        // Draw a center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 35, 0, PI2, false);
        ctx.closePath();
        ctx.fillStyle = primaryColor || "black";
        ctx.lineWidth = 4;
        ctx.strokeStyle = "white";
        ctx.fill();
        ctx.font = "bold 1em " + "sans-serif";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(buttonText || "Spin", centerX, centerY + 3);
        ctx.stroke();

        // Draw outer circle
        const outerRadius = size;
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerRadius, 0, PI2, false);
        ctx.closePath();
        ctx.stroke();

        // Draw small round circles around the outer circle
        const numCircles = 80; // Number of small circles
        const smallCircleRadius = 3; // Radius of the small circles
        const angleStep = PI2 / numCircles;

        for (let i = 0; i < numCircles; i++) {
          const angle = i * angleStep;
          const x =
            centerX + (outerRadius - smallCircleRadius) * Math.cos(angle);
          const y =
            centerY + (outerRadius - smallCircleRadius) * Math.sin(angle);

          ctx.beginPath();
          ctx.arc(x, y, smallCircleRadius, 0, PI2, false);
          ctx.closePath();
          ctx.fillStyle = "white";
          ctx.fill();
        }
      }
    };

    const drawNeedle = () => {
      const ctx = canvasContext;
      if (ctx) {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#002a74";
        ctx.fillStyle = "#002a74";
        ctx.beginPath();
        ctx.moveTo(centerX + 10, centerY - 40);
        ctx.lineTo(centerX - 10, centerY - 40);
        ctx.lineTo(centerX, centerY - 55);
        ctx.closePath();
        ctx.fill();
        const change = angleCurrent + Math.PI / 2;
        let i =
          segments.length -
          Math.floor((change / (Math.PI * 2)) * segments.length) -
          1;
        if (i < 0) i = i + segments.length;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "transparent";
        ctx.font = "bold 1.5em ";
        currentSegment = segments[i];

      }
    };

    const clear = () => {
      const ctx = canvasContext;
      if (ctx) {
        ctx.clearRect(0, 0, 1000, 800);
      }
    };

    return (
      <div id="wheel">
        <canvas
          id="canvas"
          width="380px"
          height="340px"
          style={{
            pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          }}
        />
      </div>
    );
  }
);

export default WheelComponent;
