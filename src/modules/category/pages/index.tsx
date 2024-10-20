import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, ArrowsAltOutlined } from "@ant-design/icons";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCategory } from "../hooks/queryies";
import { useDeleteCategory } from "../hooks/mutations";
import { Table, ConfirmDelete, Search } from "@component";
import Modal from "./modal";
import { TablePaginationConfig } from "antd/lib";

const Index = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setUpdate] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState({
    search: "",
    page: 1,
    limit: 5,
  });
  const navigate = useNavigate();
  const { categories, count } = useCategory(params)?.data || {};
  const { mutate } = useDeleteCategory();

  useEffect(() => {
    const pageFromParams = searchParams.get("page") || "1";
    const limitFromParams = searchParams.get("limit") || "5";
    const searchFromParams = searchParams.get("search") || "";
    setParams((prev) => ({
      ...prev,
      page: Number(pageFromParams),
      limit: Number(limitFromParams),
      search: searchFromParams,
    }));
  }, [searchParams]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current = 1, pageSize = 5 } = pagination;
    setSearchParams({
      page: String(current),
      limit: String(pageSize),
    });
  };

  const editData = (data: any) => {
    setUpdate(data);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setUpdate(null);
  };

  const columns: ColumnsType = [
    {
      title: "ID", // Yangi ustun
      dataIndex: "id", // ID qiymatini olish
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="default"
              onClick={() => editData(record)}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <ConfirmDelete
            id={record.id}
            deleteItem={(id: string | number) => mutate(id)}
          />
          <Tooltip title="Sub-category">
          <Button
    type="default"
    onClick={() => navigate(`/admin-layout/category/${record.id}/sub-category`)} // To'g'ri yo'naltirish
    icon={<ArrowsAltOutlined />}
/>

          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal open={modalVisible} handleCancel={handleCancel} update={update} />
      <div className="flex justify-between p-3">
        <Search params={params} setParams={setParams} />
        <Button type="primary" className="btn" onClick={() => setModalVisible(true)}>
          Add Category
        </Button>
      </div>
      <Table
        data={categories}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: count,
          showSizeChanger: true,
          pageSizeOptions: ["2", "5", "7", "10"],
        }}
        handleChange={handleTableChange}
      />
    </>
  );
};

export default Index;
