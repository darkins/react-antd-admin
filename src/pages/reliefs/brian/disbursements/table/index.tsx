import React, { useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';
import {
  Card,
  Table,
  Radio,
  Input,
  Tag,
  Button,
  Divider,
  message,
  Modal,
  Row,
  Col,
  Form,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import TypeSelect from './components/TypeSelect';

import { StateType } from './model';
import { TableDataType, TableListItem } from './data';
import { FormInstance } from 'antd/lib/form';
import { ColumnsType } from 'antd/lib/table';

const searchFormItemLayout = {
  labelCol: { span: 3, offset: 0 },
};

interface ListSearchTablePageProps {
  loading: boolean;
  visitData: TableDataType;
  createSubmitLoading: boolean;
  updateData: Partial<TableListItem>;
  updateSubmitLoading: boolean;
  dispatch: Dispatch;
}

const ListSearchTablePage: React.FC<ListSearchTablePageProps> = props => {
  const {
    loading,
    visitData,
    createSubmitLoading,
    updateData,
    updateSubmitLoading,
    dispatch,
  } = props;
  const { list, pagination } = visitData;

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchForm] = Form.useForm();

  const [deleteLoading, setDeleteLoading] = useState<number[]>([]);
  const [createFormVisible, setCreateFormVisible] = useState<boolean>(false);
  const [detailUpdateLoading, setDetailUpdateLoading] = useState<number[]>([]);
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);

  const searchFormSubmit = async () => {
    try {
      // const fieldsValue = await searchForm.validateFields();
      // console.log('search', fieldsValue);
      message.warning('Searched!');
    } catch (error) {}
  };

  const getList = (current: number): void => {
    dispatch({
      type: 'ListSearchTable/queryTableData',
      payload: {
        per: pagination.pageSize,
        page: current,
      },
    });
  };

  const deleteTableData = (id: number): void => {
    Modal.confirm({
      title: 'Delete',
      content: 'Are you sure you want to delete？',
      okText: 'Yes',
      cancelText: 'No',
      onOk: async () => {
        setDeleteLoading([id]);
        const res: boolean = await dispatch({
          type: 'ListSearchTable/deleteTableData',
          payload: id,
        });
        if (res === true) {
          message.success('删除成功！');
          getList(1);
        }
        setDeleteLoading([]);
      },
    });
  };

  const createSubmit = async (
    values: Omit<TableListItem, 'id'>,
    form: FormInstance,
  ) => {
    const res: boolean = await dispatch({
      type: 'ListSearchTable/createTableData',
      payload: values,
    });

    if (res === true) {
      form.resetFields();
      setCreateFormVisible(false);
      message.success('Added successfully！');
      getList(1);
    }
  };

  const detailUpdateData = async (id: number) => {
    setDetailUpdateLoading([id]);
    const res: boolean = await dispatch({
      type: 'ListSearchTable/queryUpdateData',
      payload: id,
    });
    if (res === true) {
      setUpdateFormVisible(true);
    }
    setDetailUpdateLoading([]);
  };

  const updataFormCancel = async () => {
    await dispatch({
      type: 'ListSearchTable/setUpdateData',
      payload: {},
    });
    setUpdateFormVisible(false);
  };

  const updateSubmit = async (values: TableListItem) => {
    const res: boolean = await dispatch({
      type: 'ListSearchTable/updateTableData',
      payload: values,
    });
    if (res === true) {
      updataFormCancel();
      message.success('Edit successfully！');
      getList(pagination.current);
    }
  };

  useEffect(() => {
    getList(1);
  }, [1]);

  const columns: ColumnsType<TableListItem> = [
    {
      title: 'Number',
      dataIndex: 'index',
      width: 80,
      render: (_, record, index) => (
        <>{(pagination.current - 1) * pagination.pageSize + index + 1}</>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record, index) => (
        <a href={record.href} target="_blank">
          {' '}
          {record.name}
        </a>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'desc',
    },
    {
      title: 'Position',
      dataIndex: 'type',
      render: (_, record, index) => {
        return record.type === 'header' ? (
          <Tag color="green">Head</Tag>
        ) : (
          <Tag color="cyan">Bottom</Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record, index) => {
        return (
          <>
            <Button
              type="link"
              loading={detailUpdateLoading.includes(record.id)}
              onClick={() => detailUpdateData(record.id)}
            >
              Edit
            </Button>
            <Divider type="vertical" />
            <Button
              type="link"
              loading={deleteLoading.includes(record.id)}
              onClick={() => deleteTableData(record.id)}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="indexlayout-main-conent">
      <Card
        bordered={false}
        style={{ marginBottom: '15px' }}
        bodyStyle={{ paddingBottom: '0' }}
      >
        <Form form={searchForm} name="search">
          <Row gutter={16} justify="end">
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label="Name：" name="name">
                <Input placeholder="Please enter" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label="Link：" name="herf">
                <Input placeholder="Please enter" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Form.Item {...searchFormItemLayout} label="Position：" name="type">
                <TypeSelect placeholder="please choose" />
              </Form.Item>
            </Col>
            {searchOpen ? (
              <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                <Form.Item
                  {...searchFormItemLayout}
                  label="Comment："
                  name="remark"
                >
                  <Input placeholder="Please enter" />
                </Form.Item>
              </Col>
            ) : null}
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <div
                className="text-align-right"
                style={{ paddingBottom: '24px' }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={searchFormSubmit}
                >
                  Inquire
                </Button>
                <Button
                  htmlType="button"
                  style={{ marginLeft: 8 }}
                  onClick={() => searchForm.resetFields()}
                >
                  Reset
                </Button>
                <Button
                  type="link"
                  style={{ marginLeft: 8 }}
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  {searchOpen ? (
                    <>
                      Put away
                      <UpOutlined />
                    </>
                  ) : (
                    <>
                      Unfold
                      <DownOutlined />
                    </>
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        bordered={false}
        title={
          <Button type="primary" onClick={() => setCreateFormVisible(true)}>
            Add
          </Button>
        }
        extra={
          <div>
            <Radio.Group defaultValue="all">
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="header">Top</Radio.Button>
              <Radio.Button value="footer">Bottom</Radio.Button>
            </Radio.Group>
          </div>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
            ...pagination,
            onChange: (page: number) => {
              getList(page);
            },
          }}
        />
      </Card>

      <CreateForm
        onCancel={() => setCreateFormVisible(false)}
        visible={createFormVisible}
        onSubmit={createSubmit}
        onSubmitLoading={createSubmitLoading}
      />

      {updateFormVisible && Object.keys(updateData).length > 0 ? (
        <UpdateForm
          values={updateData}
          onCancel={() => updataFormCancel()}
          visible={updateFormVisible}
          onSubmit={updateSubmit}
          onSubmitLoading={updateSubmitLoading}
        />
      ) : null}
    </div>
  );
};

export default connect(
  ({
    ListSearchTable,
    loading,
  }: {
    ListSearchTable: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['ListSearchTable/queryTableData'],
    visitData: ListSearchTable.tableData,
    createSubmitLoading: loading.effects['ListSearchTable/createTableData'],
    updateData: ListSearchTable.updateData,
    updateSubmitLoading: loading.effects['ListSearchTable/updateTableData'],
  }),
)(ListSearchTablePage);
