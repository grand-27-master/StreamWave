import React from 'react';

const AudioControls = ({ isConnected, isFilterEnabled, connectUsers, toggleFilter }) => {
  return (
    <div>
      {isConnected ? (
        <button onClick={toggleFilter}>
          {isFilterEnabled ? 'Disable Filter' : 'Enable Filter'}
        </button>
      ) : (
        <button onClick={connectUsers}>Connect Users</button>
      )}
    </div>
  );
};

export default AudioControls;
