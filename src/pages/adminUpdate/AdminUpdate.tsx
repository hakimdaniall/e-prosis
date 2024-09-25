import React, { useState } from 'react';
import { Button, Card, List, Typography, Modal } from 'antd';
import orderData from '../../mockData';
import moment from 'moment';

const { Text } = Typography;

const AdminUpdate = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null); // To track the selected order
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle opening the modal with selected order
  const handleShowSteps = (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // Handle updating the status within the modal
  const handleUpdateStatus = (index: number) => {
    const updatedSteps = selectedOrder.delivery_steps.map((step: any, idx: number) => {
      if (idx === index && step.status === 'process') {
        return { ...step, status: 'finish', timestamp: new Date().toISOString() };
      }
      return step;
    });

    setSelectedOrder({ ...selectedOrder, delivery_steps: updatedSteps });
  };

  // Function to format the timestamp
  const formatTimestamp = (timestamp: any) => {
    return timestamp ? moment(timestamp).format('hh:mmA DD/MM/YYYY') : 'N/A';
  };


  return (
    <div style={{ padding: '20px' }}>
      <Card title="Admin Panel - Orders List">
        <List
          dataSource={orderData}
          renderItem={(order) => (
            <List.Item>
              <List.Item.Meta
                title={`Order ID: ${order.id}`}
              />
              <Button type="primary" onClick={() => handleShowSteps(order)}>
                View Details
              </Button>
            </List.Item>
          )}
        />
      </Card>

      {/* Modal to show delivery steps */}
      {selectedOrder && (
        <Modal
          title={`Delivery Steps for Order ID: ${selectedOrder.id}`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <List
            dataSource={selectedOrder.delivery_steps}
            renderItem={(step: any, index: number) => (
              <List.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ flex: '1 1 50%' }}>
                    <List.Item.Meta
                      title={step.step}
                      description={step.description || 'No description available'}
                    />
                  </div>
                  <div style={{ flex: '1 1 50%', textAlign: 'right' }}>
                    <Text>Status: {step.status || 'Pending'}</Text>
                    <br />
                    <Text>Timestamp: {formatTimestamp(step.timestamp)}</Text>
                    {step.status === 'process' && (
                      <div>
                        <Button
                          type="primary"
                          onClick={() => handleUpdateStatus(index)}
                          style={{ marginLeft: '20px' }}
                        >
                          Mark as Finished
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </List.Item>
            )}
          />

        </Modal>
      )}
    </div>
  );
};

export default AdminUpdate;
