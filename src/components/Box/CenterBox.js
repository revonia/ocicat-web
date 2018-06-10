import React from 'react';
import styles from './CenterBox.css';
import * as PropTypes from "react/lib/ReactPropTypes";

const CenterBox = ({ width, height, children }) => {
  return (
    <div className={styles.normal} style={{
      width: width + 'px',
      height: height + 'px',
      marginLeft: -width / 2 + 'px',
      marginTop: -height / 2 + 'px',
    }}>
      {children}
    </div>
  );
};

CenterBox.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default CenterBox;
