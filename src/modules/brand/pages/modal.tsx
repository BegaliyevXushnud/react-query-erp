import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { ModalPropType } from "@types";
import { useCreateBrand, useUpdateBrand } from "../hooks/mutation";
import { BrandType } from "../type";
import { Upload } from "@component";
import { useCategories } from "../hooks/queries";

const { Option } = Select;

const ModalComponent = ({ open, handleCancel, update }: ModalPropType) => {
  const [file, setFile] = useState<any>(null); // Fayl uchun state
  const [form] = useForm();

  const { data: categories = [], isLoading, isError } = useCategories();
  const { mutate: createMutate, isPending: isCreating } = useCreateBrand();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateBrand();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          name: update.name,
          description: update.description,
          category_id: update.category_id,
          file: null, // Faylni tozalab qo'yamiz
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, update, form]);

  const handleSubmit = async (values: BrandType) => {
    let selectedFile = file;
    
    if (!file && update) {
        selectedFile = null;
    }

    if (!selectedFile && !update) {
        form.setFields([
            {
                name: "file",
                errors: ["Please upload a file"],
            },
        ]);
        return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (!update && values.category_id) {
        formData.append("category_id", values.category_id);
    }
    if (selectedFile) {
        formData.append("file", selectedFile);
    }

    if (update) {
        const payload = { ...values, id: update.id };
        delete payload.category_id; // Update paytida `category_id`ni jo'natmaymiz
        updateMutate(payload, {
            onSuccess: () => {
                handleCancel();
            },
        });
    } else {
        createMutate(formData, {
            onSuccess: () => {
                handleCancel();
            },
        });
    }
};


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching categories</div>;

  return (
    <Modal
      open={open}
      title={update ? "Edit Brand" : "Create Brand"}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        form={form}
        name="brandForm"
        style={{ width: "100%", marginTop: "20px" }}
        layout="vertical"
        onFinish={handleSubmit}
      >
        {!update && ( // Faylni faqat yaratishda majburiy qilamiz
          <Form.Item
            label="Brand logo"
            name="file"
            
          >
            <Upload setFile={setFile} /> {/* Fayl yuklash komponenti */}
          </Form.Item>
        )}

        <Form.Item
          label="Select category"
          name="category_id"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select a category" size="large">
            {categories.length > 0 ? (
              categories.map((item: any) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))
            ) : (
              <Option disabled>No categories available</Option>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Brand name"
          name="name"
          rules={[{ required: true, message: "Enter brand name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Enter description" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isCreating || isUpdating}>
            {update ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
