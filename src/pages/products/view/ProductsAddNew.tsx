// FormComponent.js
import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Select, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { IProduct, ProductSchema } from "../type/ProductType";
import { getProductDetails } from "../api/ProductAPI";

const ProductAddNew = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: 1,
    },
  });

  const onSubmit = (data: IProduct) => {
    // Perform form submission logic here
    console.log(data);
    message.success("New Product Added");
    navigate("/products");
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  // console.log(errors);

  return (
    <Card style={{ margin: 10 }} title={"Add New Product"}>
      <Form
        {...formItemLayout}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item
          label="Title"
          hasFeedback
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          validateStatus={errors.category ? "error" : ""}
          help={errors.category?.message}
          hasFeedback
        >
          <Controller
            name="category"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Brand"
          validateStatus={errors.brand ? "error" : ""}
          help={errors.brand?.message}
        >
          <Controller
            name="brand"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <Select.Option value="Samsung">Samsung</Select.Option>
                <Select.Option value="Huawei">Huawei</Select.Option>
                <Select.Option value="Apple">Apple</Select.Option>
              </Select>
            )}
          />
        </Form.Item>
        <Form.Item
          label="Price"
          validateStatus={errors.price ? "error" : ""}
          help={errors.price?.message}
          hasFeedback
        >
          <Controller
            name="price"
            control={control}
            render={({ field }) => <InputNumber {...field} width="100%" />}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="default"
            onClick={() => navigate("/products")}
            style={{ margin: 5 }}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductAddNew;
