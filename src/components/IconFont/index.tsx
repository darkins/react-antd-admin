/**
 * IconFont based on @ant-design/icons Encapsulation
 * @author LiQingSong
 * Instructions for use：
 *   1、iconfont.cn Build on js Resources
 *   2、@/config/settings.ts Configuration in file iconfont.cn Generated js file address.
 *   3、Demo：
 *      import IconFont from '@/components/IconFont';
 *      <IconFont type="iconfont Icon name" className="" style=""/>
 */
import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

import settings from '@/config/settings';

export interface IconFontProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconFontCN = createFromIconfontCN({
  scriptUrl: settings.iconfontUrl,
});

const IconFont: React.FC<IconFontProps> = props => {
  return <IconFontCN {...props} />;
};

export default IconFont;
