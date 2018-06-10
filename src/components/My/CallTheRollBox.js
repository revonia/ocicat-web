import React from 'react';

const CallTheRollBox = ({ width, height, children }) => {
  return (
    <div style={{
      width: width + 'px',
      height: height + 'px',
      marginLeft: -width / 2 + 'px',
      marginTop: -height / 2 + 'px',
      position: "absolute",
      top: "50%",
      left: "50%"
    }}>
      {children}
    </div>
  );
};

export default CallTheRollBox;
