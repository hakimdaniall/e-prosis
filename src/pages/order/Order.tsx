import { useState } from "react";
import { Button, Card, Input, message, Modal, Rate } from "antd";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import axios, { AxiosResponse } from "axios";
import { IProduct, IAPIResponseProducts } from "../products/type/ProductType";
import { updateProduct, getProductsList } from "../products/api/ProductAPI";
import Stepper from "./Stepper/Stepper";
import { getProductDetails, rateOrder } from "./api/OrderAPI";

const { TextArea } = Input;

const Order = () => {
    const [currentStep, setCurrentStep] = useState(4);
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
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null); // Initial state as null
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [comment, setComment] = useState("");


  const showModal = (record: any) => {
    console.log(record.title, 'stock is', record.stock)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    message.success("Success");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showRatingModal = async (record: any) => {
    const response = await getProductDetails(record.id);
    const productData = response.data;
    setCurrentProduct(productData);
    setIsRatingModalOpen(true);
    setComment("");
    setRatingValue(5);
  }

  const handleRateOrder = async () => {
    setConfirmLoading(true);
    const payload = {
      rating: ratingValue,
      comment: comment,
    };
  
    try {
      const response = await rateOrder(payload);
      console.log("Response:", response);
      message.success("Successfully Rate Order")
      setConfirmLoading(false);
      setIsRatingModalOpen(false);
    } catch (error) {
      console.error("Failed to rate order:", error);
      message.error("Failed to rate order")
      setConfirmLoading(false);
    }
  };

  const handleCancelRateOrder = () => {
    setIsRatingModalOpen(false)
  }

  const columns: ProColumns<IProduct>[] = [
    {
      title: "No",
      dataIndex: "no",
      valueType: "index",
      width: 50,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      responsive: ["lg"],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      responsive: ["lg"],
    },
    {
      title: "Options",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <Button 
            type="primary" 
            onClick={() => showModal(record)}
            key="viewStatus"
        >
           Track Order
        </Button>,

        record.id === 4 && (
            <Button 
                type="primary" 
                onClick={() => showRatingModal(record)}
                key="rate"
            >
            Rate
            </Button>
        ),
        
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
            ]}
            >
            <div style={{ paddingTop: 20 }}>
                <Stepper current={currentStep} setCurrent={setCurrentStep} />
            </div>
        </Modal>

        <Modal 
          title="Rate Order" 
          open={isRatingModalOpen} 
          onOk={handleRateOrder} 
          onCancel={handleCancelRateOrder}
          confirmLoading={confirmLoading}
        >

          <h3>{currentProduct ? currentProduct.title : null}</h3>
          <div>
            <h4>How would you rate your experience?</h4>
            <Rate
              onChange={setRatingValue}
              value={ratingValue}
              tooltips={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <h4>Leave a comment</h4>
            <TextArea
              rows={4}
              placeholder="Share more about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </Modal>

    </Card>
  );
};

export default Order;
