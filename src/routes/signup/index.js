import React from 'react';
import { Button, Form, Input, Row, Icon } from 'antd';
import { Link } from 'dva/router';
import { connect } from "dva";
import { USERNAME } from '../../config/regex';
import Background from '../../components/Background/ColorCircle';
import CB from '../../components/Box/CenterBox';
import styles from './index.css';
const FormItem = Form.Item;

const SignUp = (
  {
    loading,
    dispatch,
    finishSignUp,
    form: {
      getFieldDecorator,
      getFieldValue,
      validateFieldsAndScroll,
    }
  }
) => {

  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('密码不一致');
    } else {
      callback();
    }
  };

  const checkUsername = (rule, value, callback) => {

    if (value.length > 0) {
      if (! /[a-zA-Z]/.test(value[0])) {
        callback('用户名只能由字母开头');
        return;
      }

      if (value.length < 4) {
        callback('用户名至少4个字符');
        return;
      }

      if (! USERNAME.test(value)) {
        callback('用户名只能由字母、数字或点号组成');
        return;
      }
    }
    callback();
  };


  const handleOk = () => {
    validateFieldsAndScroll((errors, data) => {
      if (errors) {
        return;
      }
      dispatch({
        type: 'me/signup',
        payload: data,
      });
    })
  };


  if (finishSignUp) {
    return (
      <CB
        width={320}
        height={200}
      >
        <Background/>
        <Row>
          <div className={styles.logo}>
            <Icon type="check-circle" style={{ color: 'green', fontSize: '24px'}}/>
            <span style={{ fontSize: '24px', verticalAlign: 'center', marginLeft: '8px'}}>注册成功！</span>
          </div>
        </Row>
        <Row>
          <Link to="/login">
            <Button
              type="primary"
              size="large"
              style={{ width: '100%', marginTop: '20px'}}
              icon="login"
            >
              迫不及待地登录看看
            </Button>
          </Link>
        </Row>
      </CB>
    )
  }

  const btnText = loading ? '注册中' : '注册';

  return (
    <CB
      width={320}
      height={440}
    >
      <Background/>
      <div className={styles.logo}>
        <span>终于等到你～</span>
      </div>
      <Form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请填写用户名' },
              { validator: checkUsername },
              { max: 23, message: '用户名最多24个字符' },
            ],
          })(
            <Input
              size="large"
              onPressEnter={handleOk}
              placeholder="用户名"
              prefix={<Icon type="user" />}
            />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: '请填写电子邮箱' },
              { type: 'email', message: '请填写有效的电子邮箱' },
            ],
          })(
            <Input
              size="large"
              onPressEnter={handleOk}
              placeholder="邮箱"
              prefix={<Icon type="mail" />}
            />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请填写密码' },
              { min: 6, message: '密码至少6位' },
              { max: 32, message: '密码最多32位' },
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
        <FormItem hasFeedback>
          {getFieldDecorator('repassword', {
            rules: [
              { required: true, message: '请再次填写密码' },
              { validator: checkPassword },
            ],
          })(
            <Input
              size="large"
              type="password"
              onPressEnter={handleOk}
              placeholder="再次填写密码"
              prefix={<Icon type="key" />}
            />
          )}
        </FormItem>
        <Row style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            size="large"
            onClick={handleOk}
            style={{ width: '100%' }}
            loading={loading}
            icon="user-add"
          >
            {btnText}
          </Button>
        </Row>
        <p style={{ textAlign: 'center', paddingTop: '16px'}}>
          <span>
            点击注册按钮，表示你同意<Link to="/tos">《用户协议》</Link>
          </span>
        </p>
      </Form>
    </CB>
  );
};

const SignUpForm = Form.create()(SignUp);

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.models.me,
    finishSignUp: state.app.finishSignUp,
  };
}

export default connect(mapStateToProps)(SignUpForm);
