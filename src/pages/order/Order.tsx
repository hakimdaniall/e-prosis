import { useState } from "react";
import { Button, Card, Form, Modal } from "antd";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import axios, { AxiosResponse } from "axios";
import { IProduct, IAPIResponseProducts } from "../products/type/ProductType";
import { updateProduct, getProductsList } from "../products/api/ProductAPI";
import Stepper from "./Stepper/Stepper";

const Order = () => {
    const [currentStep, setCurrentStep] = useState(3);
    const waitTimePromise = async (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const waitTime = async (time: number = 100) => {
    await waitTimePromise(time);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const valueCategory = {
    all: { text: "Default", status: "Default" },
    laptop: { text: "Laptops", status: "Laptops" },
    smartphones: { text: "Smartphones", status: "Smartphones" },
    groceries: { text: "Groceries", status: "Groceries" },
  };

  const valueBrand = {
    all: { text: "Default", status: "Default" },
    samsung: { text: "Samsung", status: "Samsung" },
    apple: { text: "Apple", status: "Apple" },
  };

  const columns: ProColumns<IProduct>[] = [
    {
      title: "Index",
      dataIndex: "index",
      valueType: "index",
      width: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      filters: [
        {
          text: "iPhone",
          value: "iPhone",
        },
        {
          text: "Samsung",
          value: "Samsung",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [
            { required: true, message: "This item is required" },
            { min: 5, message: "need more than 5 chars" },
          ],
        };
      },
    },

    {
      title: "Thumbnail",
      dataIndex: "images",
      key: "Image",
      render: (imageUrls, entity) => (
        <img
          src={entity.images ? entity.images[0] : ""}
          alt="Product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
      align: "center",
      responsive: ["lg"],
      editable: false,
      hideInSearch: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <p>${price}</p>,
      align: "right",
      // defaultSortOrder: "descend",
      valueType: "digit",
      width: "10%",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["lg"],
      sorter: (a, b) => a.category.localeCompare(b.category),
      valueType: "cascader",
      valueEnum: valueCategory,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      responsive: ["lg"],
      valueType: "radioButton",
      initialValue: "all",
      valueEnum: valueBrand,
    },
    {
      title: "Options",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <Button 
            type="primary" 
            onClick={showModal}
            key="viewStatus"
        >
           Track Order
        </Button>,
      ],
    },
  ];

  return (
    <Card title="Products Listing" style={{ margin: 10 }}>
      <ProTable
        cardBordered
        request={async (params, sort, filter) => {
          try {
            const data = await getProductsList({ filter, sort, params });

            console.log(data);

            return {
              data: data.products,
              success: true,
              total: data.total,
            };
          } catch (error) {
            console.error("Error fetching products:", error);
            return {
              data: [],
              success: false,
              total: 10,
            };
          }
        }}
        rowKey={(data) => data.id}
        bordered
        columns={columns}
        editable={{
          type: "multiple",
          onSave: async (rowKey, data, row) => {
            updateProduct(data);
            await waitTime(2000);
          },
        }}
    />
        <Modal
            title="Track Order"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                currentStep === 3 && (
                <Button key="submit" type="primary" onClick={handleOk}>
                    Terima
                </Button>
                ),

                currentStep === 4 && (
                <Button key="rate" type="primary" onClick={handleOk}>
                    Rate
                </Button>
                ),
            ]}
            >
            <div style={{ paddingTop: 20 }}>
                <Stepper current={currentStep} setCurrent={setCurrentStep} />
            </div>
        </Modal>

    </Card>
  );
};

export default Order;
