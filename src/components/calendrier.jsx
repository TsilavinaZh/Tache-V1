import React, { useState } from 'react';
import { Calendar, Modal, Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const EventCalendar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState({});

  const handleDateSelect = (value) => {
    setSelectedDate(value.format('YYYY-MM-DD'));
    setModalVisible(true);
  };

  const handleAddEvent = () => {
    if (eventText.trim()) {
      setEvents((prevEvents) => ({ ...prevEvents, [selectedDate]: eventText }));
      setEventText('');
      setModalVisible(false);
    }
  };

  const handleDeleteEvent = (date) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      delete updatedEvents[date];
      return updatedEvents;
    });
  };

  const dateCellRender = (value) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const event = events[formattedDate];
    return (
      <div>
        {event && (
          <div className="event">
            <span>{event}</span>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEvent(formattedDate)}
              style={{ marginLeft: 8 }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={handleDateSelect}
        fullscreen={false}
      />

      <Modal
        title="Ajouter un événement"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Annuler
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddEvent}
          >
            Ajouter
          </Button>,
        ]}
      >
        <Input
          placeholder="Écrire un événement"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default EventCalendar;