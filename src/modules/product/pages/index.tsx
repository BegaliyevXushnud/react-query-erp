import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "../hooks/queryies"; // E'tibor bering: 'queryies' to'g'ri yozilishi kerak
import { useDeleteProduct } from "../hooks/mutations";
import { Table, ConfirmDelete, Search } from "@component";
import Modal from "./drawer";
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
  
  const { products, count } = useProduct(params)?.data || {};
console.log("Params:", params);

  const { mutate } = useDeleteProduct();

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
      title: "ID", 
      dataIndex: "id", 
      key: "id", 
    },
    {
      title: "Products Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
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
          <ConfirmDelete id={record.id} deleteItem={(id: string | number) => mutate(id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal open={modalVisible} handleCancel={handleCancel} update={update} />
      <div className="flex justify-between p-">
        <Search params={params} setParams={setParams} />
        <Button type="primary" className="btn" onClick={() => setModalVisible(true)}>
          Add Product
        </Button>
      </div>
      <Table
  data={products}
  columns={columns}
  pagination={{
    current: params.page,
    pageSize: params.limit,
    total: count,
    showSizeChanger: true,
    pageSizeOptions: ['2', '5', '7', '10'],
  }}
  handleChange={handleTableChange}
/>

    </>
  );
};

export default Index;
