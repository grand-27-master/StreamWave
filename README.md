# StreamWave

StreamWave is a React-based web application that enables real-time audio streaming between two users using WebRTC. It also allows basic audio manipulation, including the application of filters, and provides a real-time audio visualization feature.

## Features

1. **Audio Streaming**:
   - Users can stream audio between each other using WebRTC.
   - Audio input and output devices can be set for the stream.
2. **Audio Filters**:

   - Apply a frequency and gain filter to the audio stream.
   - Toggle the filter on and off dynamically during the stream.
   - Default filter settings:
     - Gain: 0.75
     - Frequency range: 0-200 Hz

3. **Audio Visualization**:
   - Real-time visualization of the audio stream as a waveform or frequency spectrum.

## Technologies Used

- **React**: Frontend framework for building the UI components.
- **WebRTC**: Used for real-time audio communication between users.
- **Web Audio API**: For audio manipulation and visualization.
- **Canvas API**: For rendering real-time audio waveforms.
