import React from 'react';
import { Card } from 'antd';

interface JohnProps {}

const John: React.FC<JohnProps> = () => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        John
      </Card>
    </div>
  );
};

export default John;
