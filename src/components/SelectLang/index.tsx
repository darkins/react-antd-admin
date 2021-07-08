import React from 'react';
import { getLocale, setLocale } from 'umi';
import classNames from 'classnames';
import { Menu, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import styles from './index.less';

interface SelectLangProps {
  className?: string;
}

const SelectLang: React.FC<SelectLangProps> = props => {
  const { className } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }: any): void => setLocale(key);

  const locales = ['en-US', 'es-ES'];
  const languageLabels = {
    'en-US': 'English',
    'es-ES': 'Spanish',
  };
  const languageIcons = {
    'en-US': '',
    'es-ES': '',
  };

  const langMenu = (
    <Menu
      className={styles.menu}
      selectedKeys={[selectedLang]}
      onClick={changeLang}
    >
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={langMenu}>
      <span className={classNames(styles.dropDown, className)}>
        <GlobalOutlined title="Some title" />
      </span>
    </Dropdown>
  );
};

export default SelectLang;
