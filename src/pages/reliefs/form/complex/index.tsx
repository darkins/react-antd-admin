import React from 'react';
import { connect, Dispatch } from 'umi';
import {
  Card,
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  Radio,
  Checkbox,
  Row,
  Col,
  message,
} from 'antd';
import FooterToolbar from '@/layouts/IndexLayout/components/FooterToolbar';
import TableForm from './components/TableForm';

import { formDataType } from './data';

interface FormComplexPageProps {
  loading: boolean;
  dispatch: Dispatch;
}

const FormComplexPage: React.FC<FormComplexPageProps> = props => {
  const { loading, dispatch } = props;

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values: formDataType) => {
    const res: boolean = await dispatch({
      type: 'FormComplex/create',
      payload: values,
    });
    if (res === true) {
      message.success('Submitted successfully');
      onReset();
    }
  };

  return (
    <div className="indexlayout-main-conent">
      <Form
        /* hideRequiredMark */
        layout="vertical"
        name="basic"
        form={form}
        onFinish={onFinish}
      >
        <Card
          bordered={false}
          title="Basic info"
          style={{ marginBottom: '20px' }}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label="Title："
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input placeholder="please enter" />
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 6, offset: 2 }}
              lg={{ span: 8 }}
              md={{ span: 12 }}
              sm={24}
            >
              <Form.Item
                label="Start and end date"
                name="date"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  placeholder={['start date', 'end date']}
                />
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 8, offset: 2 }}
              lg={{ span: 10 }}
              md={{ span: 24 }}
              sm={24}
            >
              <Form.Item
                label="Drop-down selection"
                name="select"
                rules={[
                  {
                    required: true,
                    message: 'please choose',
                  },
                ]}
              >
                <Select placeholder="please choose" allowClear>
                  <Select.Option value="1">select1</Select.Option>
                  <Select.Option value="2">select2</Select.Option>
                  <Select.Option value="3">select3</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item label="Radio button 1" name="radio-group">
                <Radio.Group>
                  <Radio value="a">item 1</Radio>
                  <Radio value="b">item 2</Radio>
                  <Radio value="c">item 3</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card
          bordered={false}
          title="Expand information"
          style={{ marginBottom: '20px' }}
        >
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label="Radio button 2"
                name="radio-button"
                rules={[{ required: true, message: 'please choose' }]}
              >
                <Radio.Group>
                  <Radio.Button value="a">item 1</Radio.Button>
                  <Radio.Button value="b">item 2</Radio.Button>
                  <Radio.Button value="c">item 3</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 6, offset: 2 }}
              lg={{ span: 8 }}
              md={{ span: 12 }}
              sm={24}
            >
              <Form.Item label="Checkbox" name="checkbox-group">
                <Checkbox.Group>
                  <Checkbox value="A" style={{ lineHeight: '32px' }}>
                    A
                  </Checkbox>

                  <Checkbox value="B" style={{ lineHeight: '32px' }} disabled>
                    B
                  </Checkbox>

                  <Checkbox value="C" style={{ lineHeight: '32px' }}>
                    C
                  </Checkbox>

                  <Checkbox value="D" style={{ lineHeight: '32px' }}>
                    D
                  </Checkbox>

                  <Checkbox value="E" style={{ lineHeight: '32px' }}>
                    E
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
            <Col
              xl={{ span: 8, offset: 2 }}
              lg={{ span: 10 }}
              md={{ span: 24 }}
              sm={24}
            >
              <Form.Item label="Comments" name="remark">
                <Input.TextArea placeholder="please enter" rows={1} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} title="Form information">
          <Form.Item name="users">
            <TableForm />
          </Form.Item>
        </Card>

        <FooterToolbar className="text-align-right">
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} style={{ marginLeft: 8 }}>
            Reset
          </Button>
        </FooterToolbar>
      </Form>
    </div>
  );
};

export default connect(
  ({
    loading,
  }: {
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['FormComplex/create'],
  }),
)(FormComplexPage);
