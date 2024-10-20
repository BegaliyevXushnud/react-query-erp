import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { ModalPropType } from "@types";
import { useCreateCategory, useUpdateCategory } from "../hooks/mutations";

const ModalComponent = ({ open, handleCancel, update }: ModalPropType) => {
    const [form] = useForm();
    const { mutate: createMutate, isPending: isCreating } = useCreateCategory();
    const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategory();

    useEffect(() => {
        if (open) {
            if (update) {
                // Eski ma'lumotlarni formga yuklash
                form.setFieldsValue({
                    name: update.name, // update ob'ektidagi to'g'ri maydonni belgilang
                });
            } else {
                // Yangilashda formni tozalash
                form.resetFields();
            }
        }
    }, [open, update, form]);

    const handleSubmit = (values: any) => {
        if (update) {
            const payload = { ...values, id: update?.id };
            updateMutate(payload, {
                onSuccess: () => {
                    handleCancel();
                },
            });
        } else {
            createMutate(values, {
                onSuccess: () => {
                    handleCancel();
                },
            });
        }
    };

    return (
        <>
            <Modal
                open={open}
                title={update ? "Edit category" : "Create category"}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    form={form}
                    name="categoryForm"
                    style={{ width: "100%", marginTop: "20px" }}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        label="Category name"
                        name="name"
                        rules={[{ required: true, message: "Enter category name" }]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            size="large"
                            style={{ width: "100%" }}
                            type="primary"
                            className="btn"
                            htmlType="submit"
                            loading={isCreating || isUpdating}
                        >
                            {update ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalComponent;
