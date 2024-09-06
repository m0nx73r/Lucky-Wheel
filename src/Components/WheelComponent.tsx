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
    upDuration = 800,
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
    const upTime = segments.length * upDuration * 5;
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
    })

    // function for initialising the canvas as well as the wheel
    const wheelInit = () => {
      initCanvas();
      wheelDraw();
    };

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

    // Image for the icon
    const iconRef = useRef<HTMLImageElement | null>(null);

    // hook to handle the mounting of the hook
    useEffect(() => {
      // Load the icon image
      iconRef.current = new Image();
      iconRef.current.src = "/gold-bar.png"; // Update with your actual path

      // Initialize the wheel once the image is loaded
      iconRef.current.onload = () => {
        wheelInit();
      };

      setTimeout(() => {
        window.scrollTo(0, 1);
      }, 0);
    }, [wheelInit]);

    // handle spin
    const spin = () => {
      // make the tab full screen if its not
      if (document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();
      }
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

    let totalSpinAngle = 0;
    const minSpinRotations = 35; // Increased to 35 (5 original + 30 additional)

    const getTargetAngle = () => {
      const winningIndex = segments.indexOf(winningSegment);
      if (winningIndex === -1) return null;

      const segmentAngle = (Math.PI * 2) / segments.length;
      return (3 * Math.PI) / 2 - (winningIndex * segmentAngle) - (segmentAngle / 2);
    }
    const onTimerTick = () => {
      frames++;
      draw();
      const totalDuration = upTime + downTime;
      const duration = new Date().getTime() - spinStart;
      let finished = false;
      
    
      if (duration < totalDuration) {
        if (duration < upTime) {
          // Acceleration phase
          const accelerationProgress = duration / upTime;
          angleDelta = maxSpeed * Math.pow(accelerationProgress, 2); // Easing function for smoother acceleration
        } else {
          // Deceleration phase
          const decelerationProgress = (duration - upTime) / downTime;
          const targetAngle = getTargetAngle();
    
          if (winningSegment && targetAngle !== null) {
            // Ensure minimum rotations
            const minimumAngle = minSpinRotations * Math.PI * 2;
          
            if (totalSpinAngle < minimumAngle) {
              // Continue spinning at max speed until minimum rotations are reached
              angleDelta = maxSpeed;
            } else {
              // Calculate the shortest path to the target angle
              let angleDifference = targetAngle - (angleCurrent % (Math.PI * 2));
              if (angleDifference < 0) angleDifference += Math.PI * 2;
              if (angleDifference > Math.PI) angleDifference -= Math.PI * 2;
    
              // Decelerate towards the target angle
              // Use a custom easing function for smoother deceleration
              const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
              angleDelta = angleDifference * easeOutCubic(decelerationProgress) * 0.1;
    
              // Gradually reduce speed as we approach the target
              if (Math.abs(angleDifference) < 0.1 && decelerationProgress > 0.8) {
                angleDelta *= 0.5; // Slow down further when close
              }
    
              // Check if we're close enough to stop
              if (Math.abs(angleDifference) < 0.001 && decelerationProgress > 0.95) {
                finished = true;
              }
            }
          } else {
            // If no winning segment, use a smooth deceleration
            angleDelta = maxSpeed * (1 - Math.pow(decelerationProgress, 2));
          }
        }
      } else {
        finished = true;
      }
    
      angleCurrent += angleDelta;
      totalSpinAngle += angleDelta;
      while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    
      if (finished) {
        setFinished(true);
        onFinished(currentSegment);
        clearInterval(timerHandle);
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
      drawWheel(); // Draw the wheel segments
      drawNeedle(); // Draw the needle
    };

    // Draw a single segment of the wheel
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
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(value, 0, 0);

        // Restore the canvas state
        ctx.restore();

        // Draw the icon image only on every 2nd segment (even index)
        if (key % 2 === 0 && iconRef.current) {
          // iconRef.current.src = `prize_${key}.jpg`
          // console.log(iconRef.current.src);
          const iconSize = size * 0.2; // Size of the icon (20% of the segment size)
          const iconX = centerX + (size / 2) * Math.cos(middleAngle) - iconSize / 2;
          const iconY = centerY + (size / 2) * Math.sin(middleAngle) - iconSize / 2;

          ctx.drawImage(iconRef.current, iconX, iconY, iconSize, iconSize);
        }
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
          height="380px"
          style={{
            pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          }}
        />
      </div>
    );
  }
);

export default WheelComponent;