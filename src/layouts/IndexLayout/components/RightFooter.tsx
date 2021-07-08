import React from 'react';

import styles from '../style.less';

export interface RightFooterProps {}

const RightFooter: React.FC<RightFooterProps> = () => {
  return (
    <div className={styles['indexlayout-right-footer']}>
      <div>© 2021 Transparency Engine 2.0. Powered by Aid:Tech.</div>
    </div>
  );
};

export default RightFooter;
