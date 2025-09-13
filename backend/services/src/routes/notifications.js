const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// Route to create a notification (used by transaction and login handlers)
router.post("/create", notificationController.createNotification);

// Get all notifications for a specific user
router.get("/:userId", notificationController.getNotifications);

// Mark a notification as read
router.put("/mark-as-read/:notificationId", notificationController.markAsRead);

// Archive a notification
router.put("/archive/:notificationId", notificationController.archiveNotification);

module.exports = router;
