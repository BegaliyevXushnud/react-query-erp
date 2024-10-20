import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { SubModalPropType } from "../type";  
import { useParams } from "react-router-dom";
import { SubCategorType } from "../type";

const SubCategoryModal = ({ open, handleCancel, update, onSubmit }: SubModalPropType) => {
  const [form] = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (open) {
      if (update) {
        form.setFieldsValue({
          name: update.name,
        });
      } else {
        form.resetFields();
      }
    }
  }, [update, open, form]);

  const handleSubmit = (values: SubCategorType) => {
    const parent_category_id = Number(id); 
    if (!parent_category_id) {
      console.error("Invalid ID: ID must be a number");
      return;
    }
    
    const updatedValues = { ...values, parent_category_id };
    onSubmit(updatedValues); // onSubmit chaqirildi
    console.log(updatedValues);
  };

  return (
    <Modal
      title={update ? "Edit Category" : "Add SubCategory"}  
      visible={open}  
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item
          label="SubCategory Name"
          name="name"
          rules={[{ required: true, message: "Please enter sub-category name" }]}
        >
          <Input placeholder="Enter sub-category name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {update ? "Update" : "Create"}  
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubCategoryModal;
