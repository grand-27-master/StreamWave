import React, { useState, useEffect, useRef } from 'react';
import AudioControl from './AudioControl';
import AudioVisual from './AudioVisual';

const AudioStream = () => {
  const [localStream, setLocalStream] = useState(null);
  const [, setRemoteStream] = useState(null);
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const peerConnection = useRef(null);
  const audioContext = useRef(null);
  const gainNode = useRef(null);
  const biquadFilter = useRef(null);
  const analyser = useRef(null);

  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    gainNode.current = audioContext.current.createGain();
    biquadFilter.current = audioContext.current.createBiquadFilter();
    biquadFilter.current.type = 'lowpass';
    biquadFilter.current.frequency.value = 200;
    gainNode.current.gain.value = 0.75;

    peerConnection.current = new RTCPeerConnection();
    peerConnection.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setLocalStream(stream);
      stream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, stream);
      });

      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(gainNode.current).connect(biquadFilter.current).connect(audioContext.current.destination);
      analyser.current = audioContext.current.createAnalyser();
      biquadFilter.current.connect(analyser.current);
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [localStream]);

  const toggleFilter = () => {
    setIsFilterEnabled(!isFilterEnabled);
    const source = audioContext.current.createMediaStreamSource(localStream);
    if (isFilterEnabled) {
      source.connect(gainNode.current).connect(audioContext.current.destination);
    } else {
      source.connect(gainNode.current).connect(biquadFilter.current).connect(audioContext.current.destination);
    }
  };

  const connectUsers = async () => {
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    setIsConnected(true);
  };

  return (
    <div>
      <AudioControl
        isConnected={isConnected}
        isFilterEnabled={isFilterEnabled}
        connectUsers={connectUsers}
        toggleFilter={toggleFilter}
      />
      {isConnected && <AudioVisual analyser={analyser.current} />}
    </div>
  );
};

export default AudioStream;
