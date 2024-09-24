import React, { useState } from 'react';
import { Modal, Button, Table, List, Card, Row, Col } from 'antd';

// Chemical Inventory Component
const ChemicalInventory = () => {
  const chemicalData = [
    { name: 'Chemical A', location: 'Link to Google Drive A' },
    { name: 'Chemical B', location: 'Link to Google Drive B' },
    { name: 'Chemical C', location: 'Link to Google Drive C' },
  ];

  return (
    <div>
      <h2>Chemical Inventory</h2>
      <Table
        dataSource={chemicalData}
        columns={[
          { title: 'Chemical Name', dataIndex: 'name', key: 'name' },
          { title: 'Storage Location', dataIndex: 'location', key: 'location', 
            render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">View Location</a> },
        ]}
        rowKey="name"
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
      <h2>Procedure (Flowchart)</h2>
      <Button type="primary" onClick={showModal}>
        View Flowchart PDF
      </Button>
      <Modal title="Procedure Flowchart" visible={isModalVisible} onCancel={handleCancel} footer={null} width={800}>
        <iframe 
          src="https://example.com/flowchart.pdf" 
          width="100%" 
          height="500px" 
          title="Flowchart PDF"
        />
      </Modal>
    </div>
  );
};

// Purchase Form Component
const PurchaseForm = () => {
  const downloadForm = () => {
    window.open('https://example.com/order-form.pdf');
  };

  const terms = [
    'Term 1: Payment must be made within 30 days.',
    'Term 2: No refunds after purchase.',
    'Term 3: Products must be inspected upon delivery.',
  ];

  return (
    <div>
      <h2>Purchase Form (Order Form)</h2>
      <Button type="primary" onClick={downloadForm}>
        Download Purchase Form
      </Button>
      <List
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
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          <Card 
            title="Inventory" 
            hoverable 
            style={{ minHeight: '300px' }} 
            bodyStyle={{ padding: '20px' }}
          >
            <ChemicalInventory />
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card 
            title="Procedure" 
            hoverable 
            style={{ minHeight: '300px' }} 
            bodyStyle={{ padding: '20px' }}
          >
            <ProcedureFlowchart />
          </Card>
        </Col>

        <Col xs={24} xl={8}>
          <Card 
            title="Purchase Form" 
            hoverable 
            style={{ minHeight: '300px' }} 
            bodyStyle={{ padding: '20px' }}
          >
            <PurchaseForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;