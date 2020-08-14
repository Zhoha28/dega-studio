import React from 'react';
import { Popconfirm, Button, Typography, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getTags, deleteTag } from '../../../actions/tags';
import { Link } from 'react-router-dom';
import { entitySelector } from '../../../selectors';

function TagList() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const { tags, total, loading } = useSelector((state) => entitySelector(state, page, 'tags'));

  React.useEffect(() => {
    fetchTags();
  }, [page]);

  const fetchTags = () => {
    dispatch(getTags({ page: page }));
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name', width: '15%' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug', width: '15%' },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '50%',
      render: (_, record) => {
        return (
          <Typography.Paragraph ellipsis={{ rows: 2 }}>{record.description}</Typography.Paragraph>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (_, record) => {
        return (
          <span>
            <Link
              className="ant-dropdown-link"
              style={{
                marginRight: 8,
              }}
              to={`/tags/${record.id}/edit`}
            >
              <Button>Edit</Button>
            </Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => dispatch(deleteTag(record.id)).then(() => fetchTags())}
            >
              <Link to="" className="ant-dropdown-link">
                <Button>Delete</Button>
              </Link>
            </Popconfirm>
          </span>
        );
      },
      width: '20%',
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={tags}
      loading={loading}
      rowKey={'id'}
      pagination={{
        total: total,
        current: page,
        pageSize: 5,
        onChange: (pageNumber, pageSize) => setPage(pageNumber),
      }}
    />
  );
}

export default TagList;