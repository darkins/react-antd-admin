/**
 * IconAntd based on @ant-design/icons Import all fonts in package
 * @author LiQingSong
 * Instructions for use：
 *   1、This component is just to facilitate the IndexLayout menu to reference the developed components
 *   2、Disadvantages: All font images are imported, and the file is too large after generation. It is recommended to use it first IconFont 、IconSvg Component
 *   3 Demo：
 *      import IconAntd from '@/components/IconAntd';
 *      <IconAntd type="SmileTwoTone" spin/>
 *      Parameter documentation：https://ant.design/components/icon-cn/#API
 */
import React from 'react';
import * as Icons from '@ant-design/icons';

export interface IconAntdProps {
  type: string;
  rotate?: number;
  spin?: boolean;
  twoToneColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconAntd: React.FC<IconAntdProps> = props => {
  const { type, ...attr } = props;

  return Icons[type] ? React.createElement(Icons[type], { ...attr }) : null;
};

export default IconAntd;
