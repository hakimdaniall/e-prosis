import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, List, Typography, Modal } from 'antd';
import moment from 'moment';
import { fetchAllOrders, updateOrderStepStatus } from './api/AdminUpdateAPI';
import { ProTable, ProColumns, ActionType } from '@ant-design/pro-components';

const { Text } = Typography;

const AdminUpdate = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const actionRef = useRef<ActionType>();

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

  const columns: ProColumns<any>[]  = [
    {
      title: 'Order Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: "Options",
      valueType: "option",
      width: 200,
      render: (text, record) => {
        return [
          <Button type="primary" onClick={() => handleShowSteps(record)} key="viewForm">
            View Form
          </Button>,
        ];
      },
    },
  ];

  // useEffect(() => {
  //   if (actionRef.current) {
  //     actionRef.current.reload();
  //   }
  // }, []);

  // Handle opening the modal with selected order
  const handleShowSteps = (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // Handle updating the status within the modal with confirmation
  const handleUpdateStatus = (index: number) => {
    Modal.confirm({
      title: 'Confirm Mark as Finished',
      content: 'Are you sure you want to mark this step as finished?',
      onOk: () => {
        const updatedSteps = selectedOrder.delivery_steps.map((step: any, idx: number) => {
          if (idx === index && step.status === 'process') {
            return { ...step, status: 'finish', timestamp: new Date().toISOString() };
          }
          return step;
        });

        setSelectedOrder({ ...selectedOrder, delivery_steps: updatedSteps });
      },
      onCancel: () => {
        console.log('Cancelled');
      },
    });
  };

  // Function to format the timestamp
  const formatTimestamp = (timestamp: any) => {
    return timestamp ? moment(timestamp).format('hh:mmA DD/MM/YYYY') : 'N/A';
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
      </Card>

      {/* Modal to show delivery steps */}
      {selectedOrder && (
        <Modal
          title={`Delivery Steps for ${selectedOrder.title}`}
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
                    <Text style={{ textTransform: "capitalize"}}>
                      Status: {step.status || 'Pending'}
                    </Text>
                    <br />
                    <Text>Timestamp: {formatTimestamp(step.timestamp)}</Text>
                    {step.status === 'process' && (
                      <div>
                        <Button
                          type="primary"
                          onClick={() => handleUpdateStatus(index)}
                          style={{ marginTop: '10px' }}
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