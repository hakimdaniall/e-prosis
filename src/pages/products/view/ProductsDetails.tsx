// FormComponent.js
import React, { useEffect } from "react";
import { Form, Input, InputNumber, Button, Card, Select, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { IProduct, ProductSchema } from "../type/ProductType";
import { getProductDetails } from "../api/ProductAPI";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: 1,
    },
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductDetails(productId as string);
        const productData = response.data;

        // Set the form values with the received data
        setValue("id", productData.id);
        setValue("title", productData.title);
        setValue("category", productData.category);
        setValue("brand", productData.brand);
        setValue("price", productData.price);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId, setValue]);

  const onSubmit = (data: IProduct) => {
    console.log(data);
    message.success("Product Detail Updated");
    navigate("/products");
    // Perform form submission logic here
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
    <Card style={{ margin: 10 }} title={"Product Details " + productId}>
      <Form
        {...formItemLayout}
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit(onSubmit)}
      >
        <Controller
          name="id"
          control={control}
          render={({ field }) => <Input {...field} type="hidden" />}
        />
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
        {/* <Form.Item
        label="Date Range"
        validateStatus={errors.dateRange ? "error" : ""}
        help={errors.dateRange?.message}
      >
      <Controller
      name="dateRange"
      control={control}
          render={({ field }) => (
            //@ts-ignore
            <RangePicker {...field} />
          )}
        />
      </Form.Item> */}
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

export default ProductDetails;
