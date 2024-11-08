import { useState } from "react";
import { Button, Card, Input, message, Modal, Rate } from "antd";
import { ProTable, ProColumns } from "@ant-design/pro-components";
import { IProduct } from "../products/type/ProductType";
import { updateProduct } from "../products/api/ProductAPI";
import Stepper from "./Stepper/Stepper";
import { getProductDetails, rateOrder, getOrders } from "./api/OrderAPI";

const { TextArea } = Input;

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isOrderReceivedModal, setIsOrderReceivedModal] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [currentFormUrl, setCurrentFormUrl] = useState(''); // State to hold the selected form URL


  const showModal = (record: any) => {
    setCurrentProduct(record);
    setIsModalOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const showFormModal = (src: any) => {
    const formUrl = src.form?.[0]?.url; // Assuming each order has a 'form' field with a URL

    console.log('process.env', process.env.REACT_APP_API_HOST)
    if (formUrl) {
      const fullUrl = `${process.env.REACT_APP_API_HOST}${formUrl}`;

      console.log('🚀 ~ showFormModal ~ fullUrl:', fullUrl);
      setCurrentFormUrl(fullUrl);
      setIsFormModalOpen(true);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const showRatingModal = async (record: any) => {
    setIsLoading(true);
    setIsRatingModalOpen(true);
    
    try {
      const response = await getProductDetails(record.id);
      const productData = response.data;
      setCurrentProduct(productData);
      setRatingValue(5);
      setComment("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleRateOrder = async () => {
    setConfirmLoading(true);
    const payload = {
      rating: ratingValue,
      comment: comment,
    };
  
    try {
      const response = await rateOrder(payload);
      message.success("Successfully rated order");
      setConfirmLoading(false);
      setIsRatingModalOpen(false);
    } catch (error) {
      console.error("Failed to rate order:", error);
      message.error("Failed to rate order");
      setConfirmLoading(false);
    }
  };

  const showOrderReceivedModal = async (record: any) => {
    setIsLoading(true);
    setIsOrderReceivedModal(true);
    
    try {
      const response = await getProductDetails(record.id);
      const productData = response.data;
      setCurrentProduct(productData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleOkOrderReceived = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOrderReceivedModal(false);
      setConfirmLoading(false);
      message.success("Order has been successfully marked as received.");
    }, 3000);
  };

  const columns: ProColumns<any>[] = [
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
      title: "Options",
      valueType: "option",
      width: 200,
      render: (text, record) => {
        const { delivery_steps } = record;

        // const isKutipanFinish = delivery_steps.some(
        //   (step: any) => step.step === "Kutipan" && step.status === "process"
        // );

        // const isSelesaiFinish = delivery_steps.some(
        //   (step: any) => step.step === "Selesai" && step.status === "finish"
        // );

        return [
          <Button type="primary" onClick={() => showFormModal(record)} key="viewForm">
            View Form
          </Button>,
          <Button type="primary" onClick={() => showModal(record)} key="viewStatus">
            Track Order
          </Button>,
          // isKutipanFinish && (
          //   <Button type="primary" onClick={() => showOrderReceivedModal(record)} key="confirm">
          //     Confirm Order
          //   </Button>
          // ),
          // isSelesaiFinish && !record.rating && (
          //   <Button type="primary" onClick={() => showRatingModal(record)} key="rate">
          //     Rate
          //   </Button>
          // ),
        ];
      },
    },
  ];

  return (
    <Card title="Order List" style={{ margin: 10 }}>
      <ProTable
        search={false}
        cardBordered
        request={async () => {
          try {
            const data = await getOrders({});

            console.log(data.data)
            return {
              data: data.data, // Assuming `data` structure contains `data` array with orders
              success: true,
              total: data.data.length, // Adjust if there's a different total count available
            };
          } catch (error) {
            console.error("Error fetching orders:", error);
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        rowKey={(data) => data.id}
        bordered
        columns={columns}
      />
        <Modal
          title="View Form"
          loading={isLoading}
          open={isFormModalOpen}
          onCancel={() => setIsFormModalOpen(false)}
          footer={[]}
          width={890}
        >
          {/* Render iframe with the dynamic URL */}
          {currentFormUrl ? (
            <iframe
              src={currentFormUrl}
              width="100%"
              style={{ height: '70vh', maxHeight: 700 }}
            ></iframe>
          ) : (
            <p>No form available for this order.</p>
          )}
        </Modal>

        <Modal
            title="Track Order"
            open={isModalOpen}
            loading={isLoading}
            onCancel={() => setIsModalOpen(false)}
            footer={[]}
            >
            <div style={{ paddingTop: 20 }}>
              <Stepper
                deliverySteps={currentProduct?.delivery_steps || []}
              />
            </div>
        </Modal>

        <Modal
          title="Confirm Order Receipt"
          open={isOrderReceivedModal}
          onOk={handleOkOrderReceived}
          confirmLoading={confirmLoading}
          loading={isLoading}
          onCancel={() => setIsOrderReceivedModal(false)}
        >
          <p>
            Please confirm that you have received the order. Once confirmed, this action cannot be undone.
          </p>
        </Modal>

        <Modal 
          title="Rate Order" 
          open={isRatingModalOpen} 
          onOk={handleRateOrder} 
          onCancel={() => setIsRatingModalOpen(false)}
          confirmLoading={confirmLoading}
          loading={isLoading}
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
