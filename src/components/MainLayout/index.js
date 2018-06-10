import React from 'react';
import {Col, Row} from "antd";
import { connect } from "dva";
import AttachRole from '../My/AttachRole';
import styles from './index.css';
import Header from "./Header";

function MainLayout({ children, location, role , loading, withoutRow }) {
  let roleAttached = role !== null;
  return (
    <div>
      <Header location={location} />

      <div style={{ margin: '16px 0' }}>
        {roleAttached === true
          ? <Row type="flex" justify="center" align="top"><Col span={22}>{ children }</Col></Row>
          : <AttachRole show={true} loading={loading} />
        }
      </div>

    </div>
  );
}

function mapStateToProps(state) {
  return {
    loading: state.loading.models.me,
    role: state.me.role,
  };
}

export default connect(mapStateToProps)(MainLayout);
