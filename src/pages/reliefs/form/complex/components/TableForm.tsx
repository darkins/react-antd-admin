import React, { useState } from 'react';
import { Button, Divider, Input, Popconfirm, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export interface TableFormDataType {
  key: string;
  name?: string;
  workId?: string;
  edit?: boolean;
  isNew?: boolean;
}

interface TableFormProps {
  value?: TableFormDataType[];
  onChange?: (value: TableFormDataType[]) => void;
}

const TableForm: React.FC<TableFormProps> = props => {
  const { value, onChange } = props;

  const [index, setIndex] = useState<number>(0);
  const [cacheOriginData, setCacheOriginData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TableFormDataType[] | undefined>(value);

  const getRowByKey = (key: string, newData?: TableFormDataType[]) =>
    (newData || data)?.filter(item => item.key === key)[0];

  const toggleEditable = (
    e: React.MouseEvent | React.KeyboardEvent,
    key: string,
  ) => {
    e.preventDefault();
    const newData = data?.map(item => ({ ...item }));
    const target = getRowByKey(key, newData);
    if (target) {
      // Save the original data when entering the editing state
      if (!target.edit) {
        cacheOriginData[key] = { ...target };
        setCacheOriginData(cacheOriginData);
      }
      target.edit = !target.edit;
      setData(newData);
    }
  };

  const newTableData = () => {
    const newData = data?.map(item => ({ ...item })) || [];

    newData.push({
      key: `NEW_TEMP_ID_${index}`,
      workId: '',
      name: '',
      edit: true,
      isNew: true,
    });

    setIndex(index + 1);
    setData(newData);
  };

  const remove = (key: string) => {
    const newData = data?.filter(
      item => item.key !== key,
    ) as TableFormDataType[];
    setData(newData);
    if (onChange) {
      onChange(newData);
    }
  };

  const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
    e.persist();
    setLoading(true);

    const target = getRowByKey(key) || ({} as any);
    if (!target.workId || !target.name) {
      message.error('Please fill in the complete information.');
      (e.target as HTMLInputElement).focus();
      setLoading(false);
      return;
    }
    delete target.isNew;
    toggleEditable(e, key);
    if (onChange) {
      onChange(data as TableFormDataType[]);
    }
    setLoading(false);
  };

  const cancel = (e: React.MouseEvent, key: string) => {
    setLoading(true);
    e.preventDefault();
    const newData = [...(data as TableFormDataType[])];
    // Original data before editing
    let cacheData = [];
    cacheData = newData.map(item => {
      if (item.key === key) {
        if (cacheOriginData[key]) {
          const originItem = {
            ...item,
            ...cacheOriginData[key],
            edit: false,
          };
          delete cacheOriginData[key];
          setCacheOriginData(cacheOriginData);
          return originItem;
        }
      }
      return item;
    });
    setData(cacheData);
    setLoading(false);
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(data as TableFormDataType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e.target.value;
      setData(newData);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
    if (e.key === 'Enter') {
      saveRow(e, key);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
      render: (text: string, record: TableFormDataType) => {
        if (record.edit) {
          return (
            <Input
              value={text}
              autoFocus
              onChange={e => handleFieldChange(e, 'name', record.key)}
              onKeyPress={e => handleKeyPress(e, record.key)}
              placeholder="Name"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Job number',
      dataIndex: 'workId',
      key: 'workId',
      width: '35%',
      render: (text: string, record: TableFormDataType) => {
        if (record.edit) {
          return (
            <Input
              value={text}
              onChange={e => handleFieldChange(e, 'workId', record.key)}
              onKeyPress={e => handleKeyPress(e, record.key)}
              placeholder="Job number"
            />
          );
        }
        return text;
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text: string, record: TableFormDataType) => {
        if (!!record.edit && loading) {
          return null;
        }
        if (record.edit) {
          if (record.isNew) {
            return (
              <span>
                <a onClick={e => saveRow(e, record.key)}>Add</a>
                <Divider type="vertical" />
                <Popconfirm
                  title="Do you want to delete this line？"
                  onConfirm={() => remove(record.key)}
                >
                  <a>Delete</a>
                </Popconfirm>
              </span>
            );
          }
          return (
            <span>
              <a onClick={e => saveRow(e, record.key)}>Save</a>
              <Divider type="vertical" />
              <a onClick={e => cancel(e, record.key)}>Cancel</a>
            </span>
          );
        }
        return (
          <span>
            <a onClick={e => toggleEditable(e, record.key)}>Edit</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Do you want to delete this line？"
              onConfirm={() => remove(record.key)}
            >
              <a>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Table<TableFormDataType>
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <Button
        style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
        type="dashed"
        onClick={newTableData}
      >
        <PlusOutlined />
        New content
      </Button>
    </>
  );
};

export default TableForm;
