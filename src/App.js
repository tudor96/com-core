import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPath = path.join(__dirname, 'events.db');

const App = () => {
  const [eventId, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [token, setToken] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSaveEvent = async () => {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await db.run(
      'CREATE TABLE IF NOT EXISTS events (eventId TEXT, eventName TEXT, token TEXT, startDate TEXT, endDate TEXT)'
    );

    await db.run(
      'INSERT INTO events (eventId, eventName, token, startDate, endDate) VALUES (?, ?, ?, ?, ?)',
      eventId,
      eventName,
      token,
      startDate,
      endDate
    );

    console.log('Event saved to database');
  };

  return (
    <Container>
      <TextField
        label='Event ID'
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Event Name'
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Token'
        value={token}
        onChange={(e) => setToken(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Start Date'
        type='date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label='End Date'
        type='date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        margin='normal'
      />
      <Button variant='contained' color='primary' onClick={handleSaveEvent}>
        Save Event
      </Button>
    </Container>
  );
};

export default App;
