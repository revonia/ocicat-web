import React from 'react';
import {Row, Form, Input, Button, Icon} from 'antd';
import { connect } from 'dva';
import { Link } from "dva/router";
import * as PropTypes from "react/lib/ReactPropTypes";
import styles from './index.css';
import Background from '../../components/Background/ColorCircle';
import CB from '../../components/Box/CenterBox';

const FormItem = Form.Item;

const Login = (
  {
    loading,
    dispatch,
    cacheUsername,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
    },
  }
) => {

  const handleOk = () => {
    validateFieldsAndScroll((errors, data) => {
      if (errors) {
        return;
      }
      dispatch({
        type: 'me/login',
        payload: data,
      });
    })
  };

  const btnText = loading ? '登录中' : '登录';

  return (
    <CB
      width={320}
      height={320}
    >
      <Background/>
      <div className={styles.logo}>
        <span>嗨，欢迎回来！</span>
      </div>

      <Form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            initialValue: cacheUsername,
            rules: [
              {
                required: true,
                message: '请填写用户名或邮箱',
              },
            ],
          })(
            <Input
              size="large"
              onPressEnter={handleOk}
              placeholder="用户名或邮箱"
              prefix={<Icon type="user" />}
            />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请填写密码',
              },
            ],
          })(
            <Input
              size="large"
              type="password"
              onPressEnter={handleOk}
              placeholder="密码"
              prefix={<Icon type="key" />}
            />
          )}
        </FormItem>
        <Row>
          <Button
            type="primary"
            size="large"
            onClick={handleOk}
            style={{ width: '100%' }}
            loading={loading}
            icon="login"
          >
            {btnText}
          </Button>
        </Row>
      </Form>
      <p style={{ textAlign: 'center', paddingTop: '16px'}}>
        <span>
          新用户？<Link to="/signup">立即注册>></Link>
        </span>
      </p>
    </CB>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  cacheUsername: PropTypes.string,
};

const LoginForm = Form.create()(Login);

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.models.me,
    cacheUsername: state.app.cacheUsername,
  };
}

export default connect(mapStateToProps)(LoginForm);
