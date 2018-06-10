import React from 'react';
import styles from './Signin.css';
import {Steps, Button, message, Form, Input, Radio, InputNumber} from 'antd';
const Step = Steps.Step;
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

const create = (
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
          label="昵称"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('nickname', {
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
            rules: [
            ],
          })(<InputNumber min={1} max={130} />)}
        </FormItem>
        <FormItem
          label="性别"
          {...formItemLayout}
          hasFeedback
        >
          {getFieldDecorator('repassword', {
            rules: [
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </div>
  );
};

const CreateForm = Form.create()(create);

const createRole = (
  {
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
          label="身份"
          {...formItemLayout}
        >
          {getFieldDecorator('role_type', {
            rules: [
            ],
            initialValue: 'student',
          })(
            <Radio.Group>
              <Radio value="student">学生</Radio>
              <Radio value="teacher">教师</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem
          label="学号"
          {...formItemLayout}
        >
          {getFieldDecorator('student_number', {
            rules: [
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </div>
  )
};

const CreateRoleForm = Form.create()(createRole);

const steps = [{
  title: '创建帐号',
  content: (
    <CreateForm/>
  ),
}, {
  title: '绑定身份',
  content: (
    <CreateRoleForm />
  ),
}, {
  title: '验证',
  content: (
    <div>验证</div>
  ),
}];

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current} size="small" style={{ marginBottom: '16px' }}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content" style={{ minHeight: "300px" }}>{steps[this.state.current].content}</div>
        <div className="steps-action" style={{ textAlign: 'right' }}>
          {
            this.state.current === 1
            &&
            <Button style={{ marginRight: 8 }} onClick={() => this.next()}>
              跳过
            </Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginRight: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>注册！</Button>
          }
        </div>
      </div>
    );
  }
}


export default Signin;
