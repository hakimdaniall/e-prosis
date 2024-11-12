import React, { useState, useRef } from 'react';
import { Button, Card, List, Typography, Modal, Rate, message } from 'antd';
import moment from 'moment';
import { fetchAllOrders, updateOrderStepStatus } from './api/AdminUpdateAPI';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';
import TextArea from 'antd/es/input/TextArea';

const { Text } = Typography;

const AdminUpdate = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentFormUrl, setCurrentFormUrl] = useState(''); // State to hold the selected form URL
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const actionRef = useRef<ActionType>();

  const initialDeliverySteps = [
    { step: 'Ketua Pusat Pengajian IPSIS-FSG', description: '3 Hari Bekerja', status: null },
    { step: 'Pegawai Perolehan', description: '5 Hari Bekerja', status: null },
    { step: 'Pelawaan Vendor', description: '2 Bulan', status: null },
    { step: 'Kutipan', description: null, status: null },
    { step: 'Selesai', description: null, status: null },
  ];

  const columns: ProColumns<any>[] = [
    { title: 'Order Title', dataIndex: 'title', key: 'title' },
    {
      title: "Options",
      valueType: "option",
      width: 200,
      render: (text, record) => {
        const { rating, comment } = record;

        return [
          <Button type="primary" onClick={() => showFormModal(record)} key="viewForm">
            View Form
          </Button>,
          <Button type="primary" onClick={() => handleShowSteps(record)} key="viewDetails">
            View Details
          </Button>,
          rating && comment && (
          <Button type="primary" onClick={() => handleShowRating(record)} key="viewDetails">
            View Rating
          </Button>
          )
        ]
      }
    
    },
  ];

  // Initialize the delivery steps based on `current_step` and `current_step_status`
  const initializeSteps = (order: any) => {
    return initialDeliverySteps.map((step, idx) => {
      if (idx < order.current_step) {
        return { ...step, status: 'finish' };
      } else if (idx === order.current_step) {
        return { ...step, status: order.current_step_status };
      }
      return step;
    });
  };

  const handleShowSteps = (order: any) => {
    const initializedSteps = initializeSteps(order);
    setSelectedOrder({ ...order, delivery_steps: initializedSteps });
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async () => {
    const currentStep = selectedOrder.current_step;
    const currentStepStatus = selectedOrder.current_step_status;
  
    if (currentStepStatus === null || currentStepStatus === 'process') {
      Modal.confirm({
        title: 'Confirm Mark as Finished',
        content: 'Are you sure you want to mark this step as finished?',
        onOk: async () => {
          try {
            const payload = {
              data: {
                current_step: currentStep + 1,
              }
            }
            // Call API to update the current step
            const response = await updateOrderStepStatus(selectedOrder.id, payload);
            console.log(response.data)
            if (response) {
              const updatedSteps = selectedOrder.delivery_steps.map((step: any, idx: any) => {
                if (idx < currentStep) return { ...step, status: 'finish' };
                if (idx === currentStep) return { ...step, status: 'finish' };
                return step;
              });
    
              setSelectedOrder({ ...selectedOrder, delivery_steps: updatedSteps, current_step: currentStep + 1 });
              setIsModalVisible(false)
              message.success(`Successfully marked as finished`);
              actionRef.current?.reload();
            }
          } catch (error) {
            console.error("Error updating order step:", error);
          }
        },
        onCancel: () => console.log('Cancelled'),
      });
    }
  };

  const showFormModal = (src: any) => {
    const formUrl = src.form?.url;

    if (formUrl) {
      const fullUrl = `${process.env.REACT_APP_API_HOST}${formUrl}`;
      setCurrentFormUrl(fullUrl);
      setIsFormModalOpen(true);
    }
  };

  const handleShowRating = (record: any) => {
    setIsRatingModalOpen(true);
    setCurrentProduct(record);
  };


  return (
    <div style={{ padding: '20px' }}>
      <Card title="Admin Panel - Orders List">
        <ProTable
          actionRef={actionRef}
          search={false}
          cardBordered
          request={async () => {
            try {
              const data = await fetchAllOrders();
              return {
                data: data.data,
                success: true,
                total: data.data.length,
              };
            } catch (error) {
              console.error("Error fetching orders:", error);
              return { data: [], success: false, total: 0 };
            }
          }}
          rowKey={(data) => data.id}
          bordered
          columns={columns}
        />
      </Card>

      {selectedOrder && (
        <Modal
          title={`Delivery Steps for ${selectedOrder.title}`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <List
            dataSource={selectedOrder.delivery_steps}
            renderItem={(step: any, index: any) => (
              <List.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ flex: '1 1 50%' }}>
                    <List.Item.Meta title={step.step} description={step.description || 'No description available'} />
                  </div>
                  <div style={{ flex: '1 1 50%', textAlign: 'right' }}>
                    <Text>Status: {step.status || 'Pending'}</Text>
                    <br />
                    {index === selectedOrder.current_step && step.status === 'process' && step.step !== 'Kutipan' && (
                      <Button
                        type="primary"
                        onClick={() => handleUpdateStatus()}
                        style={{ marginTop: '10px' }}
                      >
                        Mark as Finished
                      </Button>
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Modal>
      )}
      <Modal
          title="View Form"
          open={isFormModalOpen}
          onOk={() => setIsFormModalOpen(false)}
          onCancel={() => setIsFormModalOpen(false)}
          width={890}
        >
          {currentFormUrl ? (
            <iframe
              src={currentFormUrl}
              width="100%"
              style={{ height: '70vh', maxHeight: 700 }}
            ></iframe>
          ) : (
            <p>No form available for this order.</p>
          )}
        </Modal>,
        <Modal 
          title="Rate Order" 
          open={isRatingModalOpen} 
          onCancel={() => setIsRatingModalOpen(false)}
          footer={[]}
        >

          <h3>{currentProduct ? currentProduct.title : null}</h3>
          <div>
            <h4>How would you rate your experience?</h4>
            <Rate
              value={currentProduct?.rating}
              tooltips={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
              disabled
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <h4>Leave a comment</h4>
            <TextArea
              rows={4}
              placeholder="Share more about your experience..."
              value={currentProduct?.comment}
              readOnly
            />
          </div>
        </Modal>
    </div>
  );
};

export default AdminUpdate;