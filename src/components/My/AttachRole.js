import React from 'react';
import {Button, Modal, Radio, Form, Input} from "antd";
import { connect } from "dva";
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6, offset: 2 },
    md: { span: 6, offset: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 14 },
  },
};


function AttachRole(
  {
    show,
    loading,
    dispatch,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll
    }
  }
) {

  const handleOk = () => {
    validateFieldsAndScroll((errors, data) => {
      if (errors) {
        return;
      }
      dispatch({
        type: 'me/attachRole',
        payload: data,
      });
    })
  };

  return (
      <Modal
        visible={show}
        title="只差一步了"
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" loading={loading} onClick={handleOk}>
            提交
          </Button>
        ]}
      >
        <Form>
          <FormItem
            label="身份"
            {...formItemLayout}
            hasFeedback
          >
            {getFieldDecorator('role_type', {
              rules: [
                { required: true, message: '请选择一个身份' }
              ],
            })(
              <Radio.Group>
                <Radio value="student">学生</Radio>
                <Radio value="teacher">教师</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem
            label="学号/工号"
            {...formItemLayout}
            hasFeedback
            onPressEnter={handleOk}
          >
            {getFieldDecorator('number', {
              rules: [
                { required: true, message: '请填写学号/工号' }
              ],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
  );
}

const AttachRoleForm = Form.create()(AttachRole);

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(AttachRoleForm);
