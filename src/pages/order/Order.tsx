import { useRef, useState } from "react";
import { Button, Card, Input, message, Modal, Rate } from "antd";
import { ProTable, ProColumns, ActionType } from "@ant-design/pro-components";
import { IProduct } from "../products/type/ProductType";
import { updateProduct } from "../products/api/ProductAPI";
import Stepper from "./Stepper/Stepper";
import { getProductDetails, rateOrder, getOrders, updateOrder, deleteOrderApi } from "./api/OrderAPI";

const { TextArea } = Input;

const Order = () => {
  const actionRef = useRef<ActionType>(); // Create actionRef

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

  const initialDeliverySteps = [
    {
      step: 'Ketua Pusat Pengajian IPSIS-FSG',
      timestamp: "2024-09-22T08:00:00Z",
      description: "3 Hari Bekerja",
      status: null,
    },
    {
      step: 'Pegawai Perolehan',
      timestamp: "2024-09-23T12:00:00Z",
      description: "5 Hari Bekerja",
      status: null,
    },
    {
      step: 'Pelawaan Vendor',
      timestamp: null,
      description: "2 Bulan",
      status: null,
    },
    {
      step: 'Kutipan',
      status: "finish",
      timestamp: null,
      description: null,
    },
    {
      step: 'Selesai',
      status: null,
      timestamp: null,
      description: null,
    }
  ];

  const [deliverySteps, setDeliverySteps] = useState(initialDeliverySteps);


  const updateDeliverySteps = (currentStep: number, currentStepStatus: any) => {
    setDeliverySteps(prevSteps =>
      prevSteps.map((step, index) => {
        if (index < currentStep - 1) {
          return { ...step, status: "finish" };
        } else if (index === currentStep - 1) {
          return { ...step, status: currentStepStatus };
        } else {
          return { ...step, status: null };
        }
      })
    );
  };

  
  const showTrackOrderModal = (record: any) => {
    setCurrentProduct(record);
    updateDeliverySteps(record.current_step, record.current_step_status);
    setIsModalOpen(true);
  };

  const showFormModal = (src: any) => {
    const formUrl = src.form?.url;

    if (formUrl) {
      const fullUrl = `${process.env.REACT_APP_API_HOST}${formUrl}`;
      setCurrentFormUrl(fullUrl);
      setIsFormModalOpen(true);
      // setIsLoading(true);
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1000);
    }
  };

  const showRatingModal = async (record: any) => {
    setIsLoading(true);
    setIsRatingModalOpen(true);
    
    try {
      setCurrentProduct(record);
      setRatingValue(5);
      setComment("");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleRateOrder = async () => {
    setConfirmLoading(true);
    const order_id = currentProduct?.id

    const payload = {
      data: {
        rating: ratingValue,
        comment: comment
      }
    };
  
    try {
      const response = await updateOrder(order_id, payload);
      setConfirmLoading(false);
      setIsRatingModalOpen(false);
      message.success(`Successfully rated order ${response.data.data.title}`);
      actionRef.current?.reload();
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
      setCurrentProduct(record);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleOkOrderReceived = async () => {
    setConfirmLoading(true);
    
    const order_id = currentProduct?.id

    const payload = {
      data: {
        is_received: true,
        current_step: 5,
        current_step_status: "finish"
      }
    }

    try {
      const response = await updateOrder(order_id, payload)
      setIsOrderReceivedModal(false);
      setConfirmLoading(false);
      message.success(`${response?.data?.title} has been successfully marked as received.`);
      actionRef.current?.reload();
    } catch (error) {
      console.error("Error marking order as received:", error);
    }
  };

    // Function to show a confirmation modal for deleting an order
    const deleteOrder = (id: any) => {
      Modal.confirm({
        title: 'Are you sure you want to cancel this order?',
        content: 'This action cannot be undone.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          try {
            await deleteOrderApi(id);
            message.success('Order deleted successfully');
            actionRef.current?.reload();
          } catch (error) {
            message.error('Failed to delete order');
            console.error(error);
          }
        },
      });
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
        const { current_step, current_step_status, rating, is_received } = record;

        const isKutipanFinish = current_step === 4 && current_step_status === 'process' && !is_received
        const isSelesaiFinish = current_step === 5 && current_step_status === 'finish' && !rating

        return [
          <Button type="primary" onClick={() => showFormModal(record)} key="viewForm">
            View Form
          </Button>,
          <Button type="primary" onClick={() => showTrackOrderModal(record)} key="viewStatus">
            Track Order
          </Button>,
          isKutipanFinish && (
            <Button type="primary" onClick={() => showOrderReceivedModal(record)} key="confirm">
              Confirm Order
            </Button>
          ),
          isSelesaiFinish && !record.rating && (
            <Button type="primary" onClick={() => showRatingModal(record)} key="rate">
              Rate
            </Button>
          ),
          <Button danger onClick={() => deleteOrder(record.id)}>
            Cancel
          </Button>
        ];
      },
    },
  ];

  return (
    <Card title="Order List" style={{ margin: 10 }}>
      <ProTable
        actionRef={actionRef}
        search={false}
        cardBordered
        request={async () => {
          try {
            const data = await getOrders({});

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
                deliverySteps={deliverySteps || []}
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
