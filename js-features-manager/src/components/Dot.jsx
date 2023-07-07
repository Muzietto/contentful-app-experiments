import React from 'react';

const Dot = ({ borderColor, color, testId }) => {
  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: '100%',
        border: `3px solid ${borderColor}`,
        backgroundColor: color,
        marginRight: 8,
      }}
      data-test-id={testId}
    />
  );
};

export default Dot;
