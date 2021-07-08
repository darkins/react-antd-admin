import React from 'react';
import { connect } from 'umi';
import { Card, Alert, Descriptions } from 'antd';

import { UserModelState } from '@/models/user';

interface RolesAllProps {
  userRoles: string[];
}

const RolesAll: React.FC<RolesAllProps> = props => {

  return (
    <div className="indexlayout-main-conent">
      <Card bordered={false}>
        <Alert message="This column is a demonstration of the permission function！" type="warning" />

        <Descriptions
          title="There are three accounts and passwords below：123456. You can log in to different accounts to view the differences."
          layout="vertical"
          bordered
          style={{ marginTop: '20px' }}
          size="small"
        >
          <Descriptions.Item label="admin">
            Super administrator (has all permissions)
          </Descriptions.Item>
          <Descriptions.Item label="user">Temporary user account</Descriptions.Item>
          <Descriptions.Item label="test">Temporary test account</Descriptions.Item>
        </Descriptions>

        <Alert
          message="Note: After logging out, log in to other accounts, please refresh to view the effect."
          type="error"
          style={{ marginTop: '20px' }}
        />

       </Card>
    </div>
  );
};

export default connect(({ user }: { user: UserModelState }) => ({
  userRoles: user.currentUser.roles,
}))(RolesAll);
