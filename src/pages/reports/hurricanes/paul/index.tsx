import React from 'react';
import { Card } from 'antd';

interface PaulProps {}

const Paul: React.FC<PaulProps> = () => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        Paul
      </Card>
    </div>
  );
};

export default Paul;
