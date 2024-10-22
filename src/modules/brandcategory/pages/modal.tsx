// ModalComponent.tsx
import { Button, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { ModalPropType } from "@types";
import { useCreateBrandCategory, useUpdateBrandCategory } from "../hooks/mutation";
import { BrandCategoryType } from "../type";
import { useBrand } from "../hooks/queries";

const { Option } = Select;

const ModalComponent = ({ open, handleCancel, update }: ModalPropType) => {
    const [form] = useForm();
    
    const { data: brands = [], isLoading, isError } = useBrand();
    const { mutate: createMutate, isPending: isCreating } = useCreateBrandCategory();
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateBrandCategory();

    useEffect(() => {
        if (open) {
            if (update) {
                form.setFieldsValue({
                    name: update.name,
                    brand_id: update.brand_id, 
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, update, form]);

    const handleSubmit = async (values: any) => {
        const data: BrandCategoryType = {
            id: update ? update.id : undefined,
            name: values.name,
            brand_id: values.brand_id,
        };

        // Validatsiya logikasi
        if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
            form.setFields([{ name: "name", errors: ["Name should not be empty and must be a string"] }]);
            return;
        }
        if (!data.brand_id || typeof data.brand_id !== 'number') {
            form.setFields([{ name: "brand_id", errors: ["Brand ID should not be empty and must be an integer"] }]);
            return;
        }

        // Update yoki Create
        if (update) {
            updateMutate(data, {
                onSuccess: () => {
                    handleCancel();
                },
            });
        } else {
            createMutate(data, {
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
            title={update ? "Edit BrandCategory" : "Create BrandCategory"}
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
                <Form.Item
                    label="Select brand"
                    name="brand_id"
                    rules={[{ required: true, message: "Please select a brand" }]}
                >
                    <Select placeholder="Select a brand" size="large">
                        {brands.length > 0 ? (
                            brands.map((item: any) => (
                                <Option key={item.id} value={item.id}>
                                    {item.name}
                                </Option>
                            ))
                        ) : (
                            <Option disabled>No brands available</Option>
                        )}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="BrandCategory name"
                    name="name"
                    rules={[{ required: true, message: "Enter brand category name" }]}
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
