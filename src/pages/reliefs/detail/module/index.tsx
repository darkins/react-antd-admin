import React, { useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { Spin, Card, Descriptions, Table, Badge } from 'antd';

import { StateType } from './model';
import { DetailDataType } from './data';

const progressColumns = [
  {
    title: 'Date',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'success') {
        return <Badge status="success" text="Success" />;
      }
      return <Badge status="processing" text="Processing" />;
    },
  },

  {
    title: 'Operator ID',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: 'Duration',
    dataIndex: 'cost',
    key: 'cost',
  },
];

interface DetailModulePageProps {
  loading: boolean;
  visitData: DetailDataType;
  dispatch: Dispatch;
}

const DetailModulePage: React.FC<DetailModulePageProps> = props => {
  const { loading, visitData, dispatch } = props;
  const {
    userInfo,
    refundApplication,
    returnGoods,
    returnProgress,
  } = visitData;

  let goodsData: typeof returnGoods = [];
  if (returnGoods.length) {
    let num = 0;
    let amount = 0;
    returnGoods.forEach(item => {
      num += Number(item.num);
      amount += Number(item.amount);
    });
    goodsData = returnGoods.concat({
      id: 'Total',
      num,
      amount,
    });
  }

  useEffect(() => {
    dispatch({ type: 'DetailModule/queryDetail' });
  }, [1]);

  const renderContent = (value: any, row: any, index: any) => {
    const obj: {
      children: any;
      props: { colSpan?: number };
    } = {
      children: value,
      props: {},
    };
    if (index === returnGoods.length) {
      obj.props.colSpan = 0;
    }
    return obj;
  };
  const goodsColumns = [
    {
      title: 'Number',
      dataIndex: 'id',
      key: 'id',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return <a href="">{text}</a>;
        }
        return {
          children: <span style={{ fontWeight: 600 }}>Total</span>,
          props: {
            colSpan: 4,
          },
        };
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: renderContent,
    },
    {
      title: 'Barcode',
      dataIndex: 'barcode',
      key: 'barcode',
      render: renderContent,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right' as 'left' | 'right' | 'center',
      render: renderContent,
    },
    {
      title: 'Quantity',
      dataIndex: 'num',
      key: 'num',
      align: 'right' as 'left' | 'right' | 'center',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right' as 'left' | 'right' | 'center',
      render: (text: React.ReactNode, row: any, index: number) => {
        if (index < returnGoods.length) {
          return text;
        }
        return <span style={{ fontWeight: 600 }}>{text}</span>;
      },
    },
  ];

  return (
    <div className="indexlayout-main-conent">
      <Spin spinning={loading} size="large">
        <Card
          bordered={false}
          title="Title"
          style={{ marginBottom: '20px' }}
        >
          <Descriptions>
            <Descriptions.Item label="Pickup order number">
              {refundApplication.ladingNo}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {refundApplication.state}
            </Descriptions.Item>
            <Descriptions.Item label="Sales order number">
              {refundApplication.saleNo}
            </Descriptions.Item>
            <Descriptions.Item label="Sub-order">
              {refundApplication.childOrders}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          bordered={false}
          title="User Info"
          style={{ marginBottom: '20px' }}
        >
          <Descriptions>
            <Descriptions.Item label="Username">
              {userInfo.name}
            </Descriptions.Item>
            <Descriptions.Item label="Contact Number">
              {userInfo.tel}
            </Descriptions.Item>
            <Descriptions.Item label="Courier 1">
              {userInfo.courier}
            </Descriptions.Item>
            <Descriptions.Item label="Pickup address">
              {userInfo.address}
            </Descriptions.Item>
            <Descriptions.Item label="Comments">
              {userInfo.remark}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          bordered={false}
          title="Disaster 2"
          style={{ marginBottom: '20px' }}
        >
          <Table
            rowKey="id"
            pagination={false}
            dataSource={goodsData}
            columns={goodsColumns}
          />
        </Card>

        <Card bordered={false} title="Disaster 4">
          <Table
            pagination={false}
            dataSource={returnProgress}
            columns={progressColumns}
          />
        </Card>
      </Spin>
    </div>
  );
};

export default connect(
  ({
    DetailModule,
    loading,
  }: {
    DetailModule: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    loading: loading.effects['DetailModule/queryDetail'],
    visitData: DetailModule.detail,
  }),
)(DetailModulePage);
