import React, { useEffect, useRef } from 'react';

const AudioVisualizer = ({ analyser }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const drawVisualization = () => {
      if (analyser) {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
          requestAnimationFrame(draw);
          analyser.getByteTimeDomainData(dataArray);
          canvasCtx.fillStyle = 'rgb(200, 200, 200)';
          canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

          canvasCtx.lineWidth = 2;
          canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
          canvasCtx.beginPath();

          const sliceWidth = (canvas.width * 1.0) / bufferLength;
          let x = 0;
          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;
            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          canvasCtx.lineTo(canvas.width, canvas.height / 2);
          canvasCtx.stroke();
        };
        draw();
      }
    };
    drawVisualization();
  }, [analyser]);

  return <canvas ref={canvasRef} width="600" height="200" />;
};

export default AudioVisualizer;
