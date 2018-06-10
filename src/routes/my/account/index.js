import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import {Row, Tabs, Col, Form, Input, InputNumber, Radio, Button} from "antd";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
    md: {
      span: 14,
      offset: 4,
    },
  },
};


const Profile = (
  {
    nickname,
    realname,
    age,
    gender,
    phone,
    form: {
      getFieldDecorator,
      getFieldValue,
    }
  }
) => {
  return (
    <div>
      <Form>
        <FormItem
          label="昵称"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
            initialValue: nickname,
            rules: [
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="真实姓名"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('realname', {
            initialValue: realname,
            rules: [
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="手机号码"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          label="年龄"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('age', {
            initialValue: age || 18,
            rules: [
            ],
          })(<InputNumber min={1} max={130} />)}
        </FormItem>
        <FormItem
          label="性别"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('gender', {
            initialValue: gender || 'secret',
            rules: [
            ],
          })(
            <Radio.Group>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
              <Radio value="secret">保密</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    </div>
  );
};

const ProfileForm = Form.create()(Profile);

const ChangePassword = (
  {
    form: {
      getFieldDecorator,
      getFieldValue,
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

  return (
    <div>
      <Form>
        <FormItem
          label="原密码"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('old_password', {
            rules: [
              { required: true, message: '请填写密码' },
              { min: 6, message: '密码至少6位' },
              { max: 32, message: '密码最多32位' },
            ],
          })(<Input type="password"/>)}
        </FormItem>

        <FormItem
          label="新密码"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请填写新密码' },
              { min: 6, message: '密码至少6位' },
              { max: 32, message: '密码最多32位' },
            ],
          })(<Input type="password"/>)}
        </FormItem>
        <FormItem
          label="确认新密码"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('repassword', {
            rules: [
              { required: true, message: '请再次填写密码' },
              { validator: checkPassword },
            ],
          })(<Input type="password"/>)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    </div>
  );
};

const ChangePasswordForm = Form.create()(ChangePassword);

function Index({ profile, }) {
  return (
    <Row type="flex" justify="center" align="top">
      <Col span={18}>
        <h2 style={{ margin: '0 0 16px' }}>我的账号</h2>
        <Tabs tabPosition='left'>
          <TabPane tab="个人信息" key="1"><ProfileForm {...profile}/></TabPane>
          {/*<TabPane tab="账号信息" key="2">Content of Tab 2</TabPane>*/}
          <TabPane tab="更改密码" key="2"><ChangePasswordForm /></TabPane>
        </Tabs>
      </Col>
    </Row>

  );
}

function mapStateToProps(state) {
  return {
    profile: state.me.profile,
  };
}

export default connect(mapStateToProps)(Index);
