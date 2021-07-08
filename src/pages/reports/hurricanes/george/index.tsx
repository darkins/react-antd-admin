import React from 'react';
import { Card } from 'antd';

interface GeorgeProps {}

const George: React.FC<GeorgeProps> = () => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        George
      </Card>
    </div>
  );
};

export default George;
