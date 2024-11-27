import React, { useState } from "react";
import { Button, Modal, Form, Checkbox, Input, message } from "antd";

const MessageForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // https://back-endt.onrender.com;
  // http://localhost:3000/messages
  const API_BASE_URL = "https://back-endt.onrender.com";
  const apiEndpoints = {
    1: `${API_BASE_URL}/messages`,
    2: `${API_BASE_URL}/messages2`,
    3: `${API_BASE_URL}/messages3`,
  };

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSendMessage = async (values) => {
    const { recipients, messageText } = values;

    setLoading(true);

    try {
      const responses = await Promise.all(
        recipients.map((id) =>
          fetch(apiEndpoints[id], {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_role: `admin`,
              message: messageText,
            }),
          })
        )
      );

      // Check for response errors
      if (responses.every((response) => response.ok)) {
        message.success("Messages envoyés avec succès !");
      } else {
        message.error("Certains messages n'ont pas pu être envoyés.");
      }
      handleCloseModal();
    } catch (error) {
      message.error("Erreur lors de l'envoi des messages.");
      console.error("Erreur :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Multi message
      </Button>
      <Modal
        title="Envoyer des messages"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSendMessage}>
          <Form.Item
            name="recipients"
            label="Choisissez les destinataires"
            rules={[
              { required: true, message: "Veuillez sélectionner au moins une personne." },
            ]}
          >
            <Checkbox.Group>
              <Checkbox value="1">Mr Lanto</Checkbox>
              <Checkbox value="2">Mme Marinah</Checkbox>
              <Checkbox value="3">Mme Hanta</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="messageText"
            label="Message"
            rules={[{ required: true, message: "Veuillez entrer un message." }]}
          >
            <Input.TextArea rows={4} placeholder="Écrivez votre message ici" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Envoyer
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MessageForm;
