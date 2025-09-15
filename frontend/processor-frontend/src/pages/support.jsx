import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { CreateTicket } from "../services/api";
export const SupportPage = () => {
  const [ticketData, setTicketData] = useState({
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setTicketData({ ...ticketData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await CreateTicket(ticketData);
      console.log("Ticket submitted successfully:", response);

      // Show success message
      setSubmitMessage(
        `✅ Ticket created successfully! Ticket ID: ${response.ticketId}`
      );

      // Reset form
      setTicketData({
        subject: "",
        category: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setSubmitMessage("❌ Failed to create ticket. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Support Center
      </Typography>
      <Typography variant="body1" paragraph>
        Need help? Submit a ticket and our support team will get back to you as
        soon as possible.
      </Typography>

      {submitMessage && (
        <Box
          sx={{
            mb: 2,
            p: 2,
            bgcolor: submitMessage.includes("✅")
              ? "success.light"
              : "error.light",
            borderRadius: 1,
          }}
        >
          <Typography>{submitMessage}</Typography>
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Subject"
          name="subject"
          value={ticketData.subject}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />

        <Select
          fullWidth
          margin="normal"
          label="Category"
          name="category"
          value={ticketData.category}
          onChange={handleChange}
          required
          disabled={isSubmitting}
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
          disabled={isSubmitting}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Ticket"}
        </Button>
      </form>
    </Box>
  );
};
