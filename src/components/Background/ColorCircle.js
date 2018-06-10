import React from 'react';
import styles from './ColorCircle.css';

function ColorCircle({ tall }) {
  return (
    <div className={styles.ct}>
      <div className={styles.c0} />
      <div className={styles.c1} />
      <div className={styles.c2} />
      <div className={styles.c3} />
      <div className={styles.c4} />
      <div className={styles.c5} />
    </div>
  );
}

export default ColorCircle;
