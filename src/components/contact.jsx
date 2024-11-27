import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";  // Import Axios

const ContactPopup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (values) => {
    try {
      // Send the form data to the backend
      const response = await axios.post("https://back-endt.onrender.com/contact", values);
      console.log("Form Submitted: ", response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<MailOutlined />}
        onClick={showModal}
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          marginBottom: 20,
          marginRight: 20,
          zIndex: 1000,
          width: 50,
          height: 50,
          borderRadius: 50,
        }}
      />

      <Modal
        title="Contactez-nous"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Nom"
            name="name"
            rules={[{ required: true, message: "Veuillez entrer votre nom" }]}
          >
            <Input placeholder="Votre nom" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Veuillez entrer votre email" },
              { type: "email", message: "Veuillez entrer un email valide" },
            ]}
          >
            <Input placeholder="Votre email" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Veuillez entrer votre message" }]}
          >
            <Input.TextArea rows={4} placeholder="Votre message" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Envoyer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ContactPopup;
