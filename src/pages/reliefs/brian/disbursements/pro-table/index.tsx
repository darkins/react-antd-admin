import React from 'react';
import { Card, Alert, List } from 'antd';

interface ListSearchProTablePageProps {}

const ListSearchProTablePage: React.FC<ListSearchProTablePageProps> = props => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <Alert
          message="ProTable Was born to solve the need to write a lot in the project table The problem of the boilerplate code, so a lot of commonly used logic is encapsulated in it. These packages can be simply classified into preset behaviors and preset logics."
          type="success"
        />
        <List header={<h3>Instructions：</h3>}>
          <List.Item>
            Using npm: <br />
            $ npm install --save @ant-design/pro-table <br />
            or using yarn: <br />$ yarn add @ant-design/pro-table
          </List.Item>
          <List.Item>
            <a
              href="https://procomponents.ant.design/components/table"
              target="_blank"
            >
              Online documentation
            </a>
          </List.Item>
        </List>
      </Card>
    </div>
  );
};

export default ListSearchProTablePage;
