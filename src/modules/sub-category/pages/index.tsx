import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSubCategory } from "../hooks/queries";
import { useCreateSubCategory, useUpdateSubCategory, useDeleteSubCategory } from "../hooks/mutations";
import SubCategoryModal from "./modal";
import { Button, Tooltip, Popconfirm, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Table as GlobalTable, Loading } from "@component"; 
import { ColumnsType } from "antd/es/table";
import { ParamsType } from "@types";
import { SubCategorType } from "../type";

const SubCategory = () => {
  const [params, setParams] = useState<ParamsType>({
    limit: 3, 
    page: 1, 
    search: "",
  });

  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<SubCategorType | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetSubCategory();

  const { mutate: createMutate } = useCreateSubCategory();
  const { mutate: updateMutate } = useUpdateSubCategory();
  const { mutate: deleteMutate } = useDeleteSubCategory();

  const handleClose = () => {
    setOpen(false);
    setUpdateData(null);
  };

  const handleSubmit = (values: SubCategorType) => {
    if (updateData) {
      const payload = { id: updateData.id, data: values };
      updateMutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["subcategory"] });
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      });
    } else {
      createMutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["subcategory"] });
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      });
    }
  };

  const handleTableChange = (pagination: { current?: number; pageSize?: number }) => {
    const { current = 1, pageSize = params.limit } = pagination; 
    setParams((prev) => ({
      ...prev,
      page: current,
      limit: pageSize,
    }));

    const current_params = new URLSearchParams(window.location.search);
    current_params.set("page", `${current}`);
    current_params.set("limit", `${pageSize}`);
    navigate(`?${current_params.toString()}`);
  };

  if (isLoading) return <Loading />;

  const columns: ColumnsType<SubCategorType> = [
    {
      title: "T/R",
      dataIndex: "index",
      render: (_text, _record, index) =>
        index + 1 + ((params.page || 1) - 1) * (params.limit || 10), 
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: SubCategorType) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                setUpdateData(record);
                setOpen(true);
              }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete this sub-category?"
            onConfirm={() => {
              deleteMutate(record.id, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["subcategory"] });
                },
                onError: () => {
                  console.error("Error deleting sub-category");
                },
              });
            }}
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <SubCategoryModal
        open={open}
        handleCancel={handleClose} // `handleCancel` bu yerda to'g'ri ishlatilmoqda
        update={updateData}
        onSubmit={handleSubmit} // `onSubmit` xususiyatini qo'shdik
      />
      <Button onClick={() => { setOpen(true); setUpdateData(null); }} type="primary">
        Create SubCategory
      </Button>
      <GlobalTable 
        columns={columns}
        data={data?.data?.subcategories} 
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: data?.total || 0,
          showSizeChanger: true,
          pageSizeOptions: ["2", "5", "7", "10", "12"],
        }}
        handleChange={handleTableChange}
      />
    </>
  );
};

export default SubCategory;
