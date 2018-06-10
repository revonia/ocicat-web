import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import FrontLayout from "../components/FrontLayout/";

function IndexPage({ location, children }) {
  return (
    <FrontLayout location={location}>
      {children}
    </FrontLayout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
