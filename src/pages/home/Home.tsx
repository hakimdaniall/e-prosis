import React, { useState } from 'react';
import { Modal, Button, Table, List, Card, Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// Chemical Inventory Component
const ChemicalInventory = () => {
  const chemicalData = [
    { name: 'Chemical A', location: 'https://www.google.com' },
    { name: 'Chemical B', location: 'https://www.google.com' },
    { name: 'Chemical C', location: 'https://www.google.com' },
  ];

  return (
    <div>
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
        width={800}
      >
        <iframe 
          src="https://pii.or.id/uploads/dummies.pdf" 
          width={100}
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
    window.open('https://pii.or.id/uploads/dummies.pdf');
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

const UploadComponent = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed.`);
    }
    setFileList(info.fileList.slice(-1)); // Ensure only the last file remains in the list
  };

  const handleSubmit = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    message.success('File submitted successfully');
    setFileList([]); // Clear the file list after successful submission
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <p>To submit your completed purchase form, please use the drag-and-drop area below:</p>
      <p>Ensure that your file is filled out completely before uploading. Thank you!</p>

      <Upload.Dragger
        name="file"
        fileList={fileList}
        multiple={false}
        onChange={handleUpload}
        showUploadList={{ showRemoveIcon: false }} // Prevent removing the file manually
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Drag and drop a file here, or click to select a file</p>
      </Upload.Dragger>

      {fileList.length > 0 && (
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginTop: '10px' }}
        >
          Submit
        </Button>
      )}

      <Modal
        title="Confirm Submission"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to submit the uploaded file?</p>
      </Modal>
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