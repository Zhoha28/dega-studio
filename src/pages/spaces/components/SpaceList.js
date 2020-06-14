import React from 'react';
import { Popconfirm, Space, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';

function SpaceList() {
  const { spaces = {}, loading } = useSelector((state) => {
    const selectedOrg = state.spaces.orgs.find((item) =>
      item.spaces.includes(state.spaces.selected),
    );
    let spaces = [];
    if (selectedOrg) {
      spaces = selectedOrg.spaces.map((s) => state.spaces.details[s]);
    }
    return {
      loading: state.spaces.loading,
      spaces: spaces,
    };
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Site Address',
      dataIndex: 'site_address',
      key: 'site_address',
      width: '20%',
    },
    {
      title: 'Site Title',
      dataIndex: 'site_title',
      key: 'site_title',
      width: '20%',
    },
    {
      title: 'Tag line',
      dataIndex: 'tag_line',
      key: 'tag_line',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <span>
            <Link
              style={{
                marginRight: 8,
              }}
              to={`/spaces/edit?id=${record.id}`}
            >
              <Button>Edit</Button>
            </Link>
            <Popconfirm title="Sure to cancel?">
              <Button>Delete</Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <Space direction="vertical">
      <Link className="ant-btn ant-btn-primary" key="1" to="/spaces/create">
        Create New
      </Link>
      <Table data={spaces} columns={columns} loading={loading} />
    </Space>
  );
}

export default SpaceList;
