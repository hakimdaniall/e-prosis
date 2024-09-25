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
    
  // wait process finish error
    const delivery_steps = [
      {
        "step": 'Ketua Pusat Pengajian IPSIS-FSG',
        "status": "finish",
        "timestamp": "2024-09-22T08:00:00Z",
        "description": "3 Hari Bekerja"
      },
      {
        "step": 'Pegawai Perolehan',
        "status": "finish",
        "timestamp": "2024-09-23T12:00:00Z",
        "description": "5 Hari Bekerja"
      },
      {
        "step": 'Pelawaan Vendor',
        "status": "finish",
        "timestamp": null,
        "description": "2 Bulan"
      },
      {
        "step": 'Kutipan',
        // "status": "process",
        "status": "finish",
        "timestamp": null,
        // "description": "Tempoh kutipan ialah 1 minggu. Jika tiada kutipan dilakukan, bahan kimia yang dibeli akan dihantar ke stor simpanan."
        "description": null
      },
      {
        "step": 'Selesai',
        "status": null,
        "timestamp": null,
        // "description": "Kutipan selesai"
        "description": null
      }
    ]

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
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isOrderReceivedModal, setIsOrderReceivedModal] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null); // Initial state as null
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState("");


  const showModal = (record: any) => {
    setCurrentProduct(record)
    setIsModalOpen(true);
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  };

  const showFormModal = (src: string) => {
    console.log(src)
    setIsFormModalOpen(true);
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
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

  const showOrderReceivedModal = async (record: any) => {

    setIsLoading(true);
    setIsOrderReceivedModal(true)
    
    try {
      const response = await getProductDetails(record.id);
      const productData = response.data;
      setCurrentProduct(productData);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
      
  }

  const handleOkOrderReceived = () => {
    console.log('handleOkOrderReceived')
    setConfirmLoading(true);
    setTimeout(() => {
      setIsOrderReceivedModal(false)
      setConfirmLoading(false);
      console.log(currentProduct)
      message.success("Order has been successfully marked as received.");
    }, 3000);
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
      title: "Options",
      valueType: "option",
      width: 200,
      render: (text, record, _, action) => [
        <Button 
            type="primary" 
            onClick={() => showFormModal('record')}
            key="viewForm"
        >
           View Form
        </Button>,

        <Button 
            type="primary" 
            onClick={() => showModal(record)}
            key="viewStatus"
        >
           Track Order
        </Button>,

        <Button 
          type="primary" 
          onClick={() => showOrderReceivedModal(record)}
          key="confirm"
        >
          Confirm Order
        </Button>,

        <Button 
            type="primary" 
            onClick={() => showRatingModal(record)}
            key="rate"
        >
        Rate
        </Button>,
        
      ],
    },
  ];

  return (
    <Card title="Order List" style={{ margin: 10 }}>
      <ProTable
        search={false}
        cardBordered
        request={async (params, sort, filter) => {
          try {
            const data = await getProductsList({ filter, sort, params });
            data.products.forEach((el: any) => {
              el.delivery_steps = delivery_steps
            })
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
          title="View Form"
          loading={isLoading}
          open={isFormModalOpen}
          onCancel={() => setIsFormModalOpen(false)}
          footer={[
            <Button 
            key="back" 
            onClick={() => setIsFormModalOpen(false)}
            >
              Return
            </Button>,
          ]}
          width={890}
        >
          <iframe 
            src="https://pii.or.id/uploads/dummies.pdf" 
            width={100}
            style={{ width: '100%', height: '500px'}}
          ></iframe>
        </Modal>

        <Modal
            title="Track Order"
            open={isModalOpen}
            loading={isLoading}
            onCancel={() => setIsModalOpen(false)}
            footer={[
              <Button key="back" onClick={() => setIsModalOpen(false)}>
                Return
              </Button>,
            ]}
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
