import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem } from '@mui/material';
import { CreateTicket } from '../services/api';
export  const SupportPage = () => {
  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    message: '',
  });

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const Create = await  CreateTicket(ticketData)
    // Here you would typically send the ticket data to your backend
    console.log('Ticket submitted', ticketData);
  };
  

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Support Center
      </Typography>
      <Typography variant="body1" paragraph>
        Need help? Submit a ticket and our support team will get back to you as soon as possible.
      </Typography>
      <form onSubmit={handleSubmit}>
      
      
        <TextField
          fullWidth
          margin="normal"
          label="Subject"
          name="subject"
          value={ticketData.subject}
          onChange={handleChange}
          required
        />
     
        <Select
          fullWidth
          margin="normal"
          label="Category"
          name="category"
          value={ticketData.category}
          onChange={handleChange}
          required
        >
          <MenuItem value="technical">Technical Issue</MenuItem>
          <MenuItem value="billing">Billing Question</MenuItem>
          <MenuItem value="feature">Feature Request</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        <TextField
          fullWidth
          margin="normal"
          label="Message"
          name="message"
          multiline
          rows={4}
          value={ticketData.message}
          onChange={handleChange}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit Ticket
        </Button>
      </form>
    </Box>
  );
};

