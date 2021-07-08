import React from 'react';
import { useIntl } from 'umi';
import { FormInstance } from 'antd/lib/form';
import { Modal, Form, Input, Button, message } from 'antd';

import TypeSelect from './TypeSelect';

import { TableListItem } from '../data';

interface UpdateFormPorps {
  visible: boolean;
  values: Partial<TableListItem>;
  onSubmitLoading: boolean;
  onSubmit: (values: TableListItem, form: FormInstance) => void;
  onCancel: () => void;
}

const UpdateForm: React.FC<UpdateFormPorps> = props => {
  const { visible, values, onSubmit, onSubmitLoading, onCancel } = props;
  const { formatMessage } = useIntl();

  const formVals: TableListItem = {
    id: values.id || 0,
    name: values.name || '',
    desc: values.desc || '',
    href: values.href || '',
    type: values.type || '',
  };

  const [form] = Form.useForm();

  const onFinish = async () => {
    try {
      const fieldsValue = await form.validateFields();
      onSubmit({ ...formVals, ...fieldsValue }, form);
    } catch (error) {
      message.warning(
        formatMessage({ id: 'app.global.form.validatefields.catch' }),
      );
    }
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      title="Edit"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={() => onCancel()}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={onSubmitLoading}
          onClick={() => onFinish()}
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        form={form}
        name="createform"
        labelCol={{ span: 4 }}
        initialValues={{
          name: formVals.name,
          href: formVals.href,
          desc: formVals.desc,
          type: formVals.type,
        }}
      >
        <Form.Item
          label="Position"
          name="type"
          rules={[
            {
              required: true,
              message: 'please choose',
            },
          ]}
        >
          <TypeSelect placeholder="please choose" />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              validator: async (rule, value) => {
                if (value === '' || !value) {
                  throw new Error('Please enter a name');
                } else if (value.length > 15) {
                  throw new Error('The length cannot be greater than 15 characters');
                }
              },
            },
          ]}
        >
          <Input placeholder="Please enter a name" />
        </Form.Item>
        <Form.Item
          label="URL"
          name="href"
          rules={[
            {
              required: true,
              validator: async (rule, value) => {
                if (value === '' || !value) {
                  throw new Error('Please enter the URL');
                } else if (
                  !/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
                    value,
                  )
                ) {
                  throw new Error('Please enter the correct URL');
                }
              },
            },
          ]}
        >
          <Input placeholder="Please enter the URL" />
        </Form.Item>

        <Form.Item label="Comments" name="desc">
          <Input placeholder="Please leave a comment" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
