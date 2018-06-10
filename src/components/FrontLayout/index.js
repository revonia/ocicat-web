import React from 'react';
import styles from './index.css';
import Header from "./Header";

function FrontLayout({ children, location }) {
  return (
    <div>
      <Header location={location} />
      <div>
        { children }
      </div>
    </div>
  );
}

export default FrontLayout;
