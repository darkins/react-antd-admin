import React from 'react';
import { Card } from 'antd';

export default () => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        This page can only be viewed by user and admin accounts.
      </Card>
    </div>
  );
};
