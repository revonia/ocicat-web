import React from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/MainLayout/';
import styles from './MyPage.css';

function MyPage({ location, children }) {
  return (
    <MainLayout location={location}>
      {children}
    </MainLayout>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(MyPage);
