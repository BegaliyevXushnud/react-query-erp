import { useEffect, useState } from "react";
import { Button, Form, Input, Col, Drawer, Row, Select, Upload } from "antd"; // Importing Upload and Button from Ant Design
import { useForm } from "antd/lib/form/Form";
import { useCategory } from "../../category/hooks/queryies";
import { useBrandById, useBrandCategoryById } from "../hooks/queryies";
const { Option } = Select;
import { useCreateProduct } from "../hooks/mutations";
import { ModalPropType } from "@types";

const ProductDrawer = ({ open, handleCancel, update }: ModalPropType) => {
    const [categoryId, setCategoryId] = useState<number | undefined>();
    const [brandId, setBrandId] = useState<number | undefined>();
    const [file, setFile] = useState<any>(null);
    const { brands } = useBrandById(categoryId || 0).data || {};
    const { brandCategories } = useBrandCategoryById(brandId || 0).data || {};
    const { categories } = useCategory({}).data || {};
    const [form] = useForm();

    const changeCategory = (id: number | undefined) => {
        setCategoryId(id);
    };

    const changeBrand = (id: number | undefined) => {
        setBrandId(id);
    };

    useEffect(() => {
        if (open) {
            if (update) {
                form.setFieldsValue({
                    name: update.name,
                    price: update.price,
                    category_id: update.category_id,
                    brand_id: update.brand_id,
                    brand_category_id: update.brand_category_id,
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, update, form]);

    const { mutate: createMutate } = useCreateProduct();

    const handleSubmit = (values: any) => {
        const selectedFile = file?.originFileObj || file;
        if (!selectedFile) {
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
        formData.append("price", values.price);
        formData.append("category_id", values.category_id);
        formData.append("brand_id", values.brand_id);
        formData.append("brand_category_id", values.brand_category_id);
        formData.append("files", selectedFile);

        createMutate(formData, {
            onSuccess: () => {
                handleCancel();
            },
        });
    };

    const handleFileChange = (info: any) => {
        setFile(info.file);
    };

    return (
        <>
            <Drawer
                title="Create a new product"
                width={720}
                onClose={handleCancel}
                open={open}
                bodyStyle={{
                    paddingBottom: 80,
                }}
            >
                <Form layout="vertical" onFinish={handleSubmit} form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter product name' }]}
                            >
                                <Input placeholder="Please enter product name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: 'Please enter product price' }]}
                            >
                                <Input placeholder="Please enter product price" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="category_id"
                                label="Category"
                                rules={[{ required: true, message: 'Please select category' }]}
                            >
                                <Select onSelect={changeCategory} placeholder="Please select a category">
                                    {categories?.map((item: any) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="brand_id"
                                label="Brand"
                                rules={[{ required: true, message: 'Please choose the brand' }]}
                            >
                                <Select
                                    disabled={brands?.length === 0}
                                    onSelect={changeBrand}
                                    placeholder="Please choose the brand"
                                >
                                    {brands?.map((item: any) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="brand_category_id"
                                label="Brand Category"
                                rules={[{ required: true, message: 'Please choose brand category' }]}
                            >
                                <Select disabled={brandCategories?.length === 0} placeholder="Please choose brand category">
                                    {brandCategories?.map((item: any) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="file"
                                label="Image"
                                rules={[{ required: true, message: 'Please upload an image' }]}
                            >
                                <Upload
                                    onChange={handleFileChange}
                                    beforeUpload={() => false} // Prevent auto-upload, handle manually
                                >
                                    <Button>Click to Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default ProductDrawer;
