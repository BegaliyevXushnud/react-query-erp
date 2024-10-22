import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { useBrand } from "../hooks/queries";
import { useDeleteBrand } from "../hooks/mutation";
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
  const { brands, count } = useBrand(params)?.data || {};
  const { mutate } = useDeleteBrand();

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
      dataIndex: "id", // 'id' ustuni qo'shildi
      key: "id", // 'id' uchun kalit
    },
    {
      title: "Brand Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (img) => (
        <img src={img} alt="Brand" style={{ width: '50px', height: '50px' }} />
      ),
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
            icon={<DeleteFilled />}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
     <div className="flex flex-col gap-4">
     <Modal open={modalVisible} handleCancel={handleCancel} update={update} />
      <div className="flex justify-between p-">
        <Search params={params} setParams={setParams} />
        <Button type="primary" className="btn" onClick={() => setModalVisible(true)}>
          Add Category
        </Button>
      </div>
      <Table
        data={brands}
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
     </div>
    </>
  );
};

export default Index;
