import React from 'react';
import { Popconfirm, Button, Typography, Table, Space, Form, Select, Input } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../../actions/categories';
import { Link } from 'react-router-dom';
import deepEqual from 'deep-equal';

function CategoryList() {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const [filters, setFilters] = React.useState();
  const [form] = Form.useForm();
  const { Option } = Select;

  const { categories, total, loading } = useSelector((state) => {
    let query = {
      page,
      ...filters,
    };

    const node = state.categories.req.find((item) => {
      return deepEqual(item.query, query);
    });

    if (node)
      return {
        categories: node.data.map((element) => state.categories.details[element]),
        total: node.total,
        loading: state.categories.loading,
      };
    return { categories: [], total: 0, loading: state.categories.loading };
  });

  React.useEffect(() => {
    fetchCategories();
  }, [page, filters]);

  const fetchCategories = () => {
    dispatch(getCategories({ page: page, ...filters }));
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Slug', dataIndex: 'slug', key: 'slug' },
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
    { title: 'Parent Category', dataIndex: 'parent_id', key: 'parent_id' },
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
              to={`/categories/${record.id}/edit`}
            >
              <Button>Edit</Button>
            </Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => dispatch(deleteCategory(record.id)).then(() => fetchCategories())}
            >
              <Link to="" className="ant-dropdown-link">
                <Button>Delete</Button>
              </Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <Space direction={'vertical'}>
      <Form
        initialValues={filters}
        form={form}
        name="filters"
        layout="inline"
        onFinish={(values) =>
          setFilters({
            sort_by: values.sort,
            q: values.q,
          })
        }
        style={{ maxWidth: '100%' }}
      >
        <Form.Item name="q" label="Search" style={{ width: '25%' }}>
          <Input placeholder="search categories" />
        </Form.Item>
        <Form.Item name="sort" label="sort" style={{ width: '15%' }}>
          <Select>
            <Option value="desc">Latest</Option>
            <Option value="asc">Old</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table
        bordered
        columns={columns}
        dataSource={categories}
        loading={loading}
        rowKey={'id'}
        pagination={{
          total: total,
          current: page,
          pageSize: 5,
          onChange: (pageNumber, pageSize) => setPage(pageNumber),
        }}
      />
    </Space>
  );
}

export default CategoryList;
