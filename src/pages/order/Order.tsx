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
  const [comment, setComment] = useState("");


  const showModal = (record: any) => {
    setCurrentProduct(record)
    setIsModalOpen(true);
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
    }, 3000)
  };

  const showFormModal = (src: string) => {
    console.log(src)
    setIsFormModalOpen(true);
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
    }, 3000)
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

  const showOrderReceivedModal = async (record: any) => {
    const response = await getProductDetails(record.id);
    const productData = response.data;
    setCurrentProduct(productData);
    setIsOrderReceivedModal(true)
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

  const handleCancelOrderReceivedModal = () => {
    console.log('handleCancelOrderReceivedModal')
    setIsOrderReceivedModal(false)
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
          loading={confirmLoading}
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
            loading={confirmLoading}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
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
          onCancel={handleCancelOrderReceivedModal}
        >
          <p>
            Please confirm that you have received the order. Once confirmed, this action cannot be undone.
          </p>
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
