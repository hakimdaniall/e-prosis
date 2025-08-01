import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, List, Card, Row, Col, Upload, message, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getGoogleDriveLink, submitOrderForm } from './api/HomeAPI';
import UploadComponent from './Upload';

const CartaAlir = "/carta-alir.pdf";
const BorangTempahan = "/borang-tempahan.pdf";

// Chemical Inventory Component
const ChemicalInventory = () => {
 
  const [googleDrinkLink, setGoogleDrinkLink] = useState<any | null>(null);

   const chemicalData = [
    { name: 'FSG', location: googleDrinkLink },
    // { name: 'Chemical B', location: 'https://www.google.com' },
    // { name: 'Chemical C', location: 'https://www.google.com' },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const response = await getGoogleDriveLink();
      setGoogleDrinkLink(response.data.data.link);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Table
        dataSource={chemicalData}
        columns={[
          { title: 'Storage', dataIndex: 'name', key: 'name' },
          { title: 'Storage Location', dataIndex: 'location', key: 'location', 
            render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">View Location</a> },
        ]}
        rowKey="name"
        pagination={false}
      />
    </div>
  );
};

// Procedure (Flowchart) Component
const ProcedureFlowchart = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <p>This flowchart outlines the standard operating procedure for handling key processes.</p>
      <p>Follow the steps in the document to ensure compliance and accuracy in your workflow.</p>
      <Button type="primary" onClick={showModal}>
        View Flowchart PDF
      </Button>

      <Modal 
        title="Procedure Flowchart" 
        open={isModalVisible} 
        onCancel={handleCancel} 
        footer={null} 
        width={890}
      >
        <iframe 
          src={CartaAlir} 
          style={{ width: '100%', height: '100vh', maxHeight: 700 }}
          title="Flowchart PDF"
        />
      </Modal>
    </div>
  );
};

// Purchase Form Component
const PurchaseForm = () => {
  const downloadForm = () => {
    window.open(BorangTempahan);
  };

  const terms = [
    'Term 1: Payment must be made within 30 days.',
    'Term 2: No refunds after purchase.',
    'Term 3: Products must be inspected upon delivery.',
  ];

  return (
    <div>
      <Button type="primary" onClick={downloadForm}>
        Download Purchase Form
      </Button>
      <List
        style={{ marginTop: 20 }}
        header={<div>Terms and Conditions</div>}
        bordered
        dataSource={terms}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
};

const Home = () => {
  return (
    <div style={{ padding: 20, height: '100%', paddingBottom: 35 }}>
      <Row 
        gutter={[16, 16]} 
        style={{ height: '100%' }} 
        justify="space-between"
      >
        <Col xs={24} lg={12} style={{ height: '50%' }}>
          <Card 
            title="Inventory" 
            style={{ height: '100%' }} 
          >
            <ChemicalInventory />
          </Card>
        </Col>

        <Col xs={24} lg={12} style={{ height: '50%' }}>
          <Card 
            title="Procedure" 
            style={{ height: '100%' }} 
          >
            <ProcedureFlowchart />
          </Card>
        </Col>

        <Col xs={24} lg={12} style={{ height: '50%' }}>
          <Card 
            title="Purchase Form" 
            style={{ height: '100%' }} 
          >
            <PurchaseForm />
          </Card>
        </Col>
        
        <Col xs={24} lg={12} style={{ height: '50%' }}>
          <Card 
            title="Submit Order Form" 
            style={{ height: '100%' }} 
          >
            <UploadComponent />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;