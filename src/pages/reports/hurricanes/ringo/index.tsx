import React from 'react';
import { Card } from 'antd';

interface RingoProps {}

const Ringo: React.FC<RingoProps> = () => {
  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        Ringo
      </Card>
    </div>
  );
};

export default Ringo;
