import React, { useState } from 'react';
import { Upload, Button, Modal, message, UploadFile, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from "js-cookie";


interface FileWithOrigin extends UploadFile {
  originFileObj?: any;
}

const UploadComponent = () => {
  const [fileList, setFileList] = useState<FileWithOrigin[]>([]); // Define the type for fileList
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileId, setFileId] = useState<number | null>(null); // To store the uploaded file's ID
  const [isLoading, setIsLoading] = useState(false)
  const [form] = Form.useForm(); // Initialize the form instance

  // Handle file selection
  const handleUpload = (info: any) => {
    console.log('🚀 ~ handleUpload ~ info:', info);
    setFileList(info.fileList.slice(-1)); // Keep only the latest file
  };

  // Handle form submission and upload file to Strapi
  const handleSubmit = async () => {
    setIsModalVisible(true);
  };

  // Handle confirm upload and create order
  const handleOk = async () => {
    setIsModalVisible(false);
    setIsLoading(true)
    if (fileList.length > 0) {
      const file = fileList[0]?.originFileObj; // Get the first file from the list
      try {
        // Step 1: Upload the file to Strapi
        const uploadResponse = await uploadFileToStrapi(file);

        // Get file ID from the response
        const uploadedFileId = uploadResponse[0]?.id;
        setFileId(uploadedFileId);

        if (uploadedFileId) {
          // Step 2: Create an order with the uploaded file ID
          await createOrder(form.getFieldValue('title'), uploadedFileId);
          message.success('File submitted successfully');
          form.resetFields(); // Reset form fields after submission
          setFileList([]); // Clear file list after submission
          setIsLoading(false)
        } else {
          message.error('Error: File upload failed');
        }
      } catch (error) {
        message.error('Error submitting file');
      }
    }
  };

  // Handle cancel of the modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to upload file to Strapi
  const uploadFileToStrapi = async (file: File | undefined) => {
    const formData = new FormData();
    const token = Cookies.get("jwt");
    console.log('🚀 ~ uploadFileToStrapi ~ token:', token);
    if (file) {
      formData.append('files', file);
    }
    if (!token) {
      throw new Error("No token found");
    }

    try {
      const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Replace with your actual JWT token
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  // Function to create an order with file ID
  const createOrder = async (title: string, fileId: number) => {
    const token = Cookies.get("jwt");
    const orderData = {
      data: {
        title,
        form: {
          id: fileId,
        },
      },
    };
    
    if (!token) {
      throw new Error("No token found");
    }

    try {
      const response = await axios.post(process.env.REACT_APP_API_HOST + '/api/orders', orderData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Replace with your actual JWT token
          'Content-Type': 'application/json',
        },
      });
      console.log('Order created:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  return (
    <div>
      {/* <p>To submit your completed purchase form, please use the drag-and-drop area below:</p>
      <p>Ensure that your file is filled out completely before uploading. Thank you!</p> */}

      <Form
        form={form} // Attach the form instance
        onFinish={handleSubmit} // Trigger the handleSubmit when the form is valid
        layout="vertical" // Horizontal layout for form
      >
        <Form.Item
          label="Form Title"
          name="title" // Name to link with form values
          rules={[{ required: true, message: 'Please enter the form title' }]} // Validation for title
        >
          <Input
            placeholder="Enter form title"
            style={{ marginBottom: '10px', width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="File Upload"
          name="file"
          rules={[{ required: true, message: 'Please upload a file' }]} // Validation for file upload
        >
          <Upload.Dragger
            name="file"
            fileList={fileList}
            multiple={false}
            onChange={handleUpload}
            beforeUpload={() => false} // Prevent auto upload, handle manually
            showUploadList={{ showRemoveIcon: false }} // Prevent removing the file manually
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Drag and drop a file here, or click to select a file</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button 
          type="primary" 
          htmlType="submit" 
          style={{ marginTop: '10px' }}
          loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>

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

export default UploadComponent;