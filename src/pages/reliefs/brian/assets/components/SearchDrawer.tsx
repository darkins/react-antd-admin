import React from 'react';
import { Drawer, Button, Form, Input } from 'antd';

import TypeSelect from './TypeSelect';

import { FormInstance } from 'antd/lib/form';
import { TableListItem } from '../data';

interface SearchDrawerProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit?: (values: Omit<TableListItem, 'id'>, form: FormInstance) => void;
  title?: string;
}

const SearchDrawer: React.FC<SearchDrawerProps> = props => {
  const { visible, onClose, onSubmit, title = 'Advanced Search' } = props;

  const [form] = Form.useForm();

  const onSearch = async () => {
    try {
      const fieldsValue = await form.validateFields();
      if (onSubmit) {
        onSubmit(fieldsValue as Omit<TableListItem, 'id'>, form);
      }
    } catch (error) {}
  };

  return (
    <Drawer
      placement="right"
      width={360}
      title={title}
      closable={false}
      onClose={onClose}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }} onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" onClick={onSearch}>
            Search
          </Button>
        </div>
      }
    >
      <Form layout="vertical" form={form} name="searchform" hideRequiredMark>
        <Form.Item label="URL" name="type">
          <TypeSelect placeholder="Please choose" />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input placeholder="Please enter a name" />
        </Form.Item>
        <Form.Item label="URL" name="href">
          <Input placeholder="Please enter the URL" />
        </Form.Item>

        <Form.Item label="Comments" name="desc">
          <Input placeholder="Please leave a comment" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default SearchDrawer;
