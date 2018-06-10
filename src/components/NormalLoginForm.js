import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import styles from './NormalLoginForm.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, data) => {
      if (err) return;
      dispatch({ type: 'me/login', payload: data });
      console.log(data);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名或邮箱！' }],
          })(
            <Input
              prefix={<Icon type="user"/>}
              placeholder="用户名或邮箱" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="密码"
            />
          )}
        </FormItem>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <FormItem>
              <Button type="primary" htmlType="submit" size="large">
                登录
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

function mapStateToProps() {
  return {};
}

export default WrappedNormalLoginForm;
