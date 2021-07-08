/**
 * customize svg icon
 * @author LiQingSong
 * Instructions for use：
 *   1、Download or make svg file and store it in /src/assets/iconsvg directory
 *   2、/src/assets/iconsvg/svgo.yml Configure automatic compression and condensed svg, you can also run npm run svgo to compress condensed svg independently
 *   3、Demo：
 *      import IconSvg from '@/components/IconSvg';
 *      <IconSvg type="svg file name" className="" style=""/>
 */
import React from 'react';
import style from './style.less';

const importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('../../assets/iconsvg', false, /\.svg$/));
} catch (error) {
  // eslint-disable-next-line no-console
  console.log(error);
}

export interface IconSvgProps {
  type: string;
  style?: React.CSSProperties;
  className?: string;
}

const IconSvg: React.FC<IconSvgProps> = props => {
  const { type, className, ...attr } = props;

  return (
    <svg className={`${style['icon-svg']} ${className || ''}`} {...attr}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};

export default IconSvg;
