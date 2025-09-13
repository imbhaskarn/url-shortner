const Notification = require("../models/notification");
const User = require("../models/user");

// Helper: create notification directly (can be called from anywhere)
async function createNotification(data) {
  const { userId, type, title, message } = data;

  // Ensure user exists
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Create notification
  const notification = new Notification({
    user: userId,
    type,
    title,
    message,
  });

  await notification.save();
  return notification;
}

// Route: Create Notification via API
exports.createNotificationRoute = async (req, res) => {
  try {
    const notification = await createNotification(req.body);
    return res.status(201).json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Route: Get notifications for a user
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Route: Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: "read" },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Route: Archive
exports.archiveNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { status: "archived" },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Export helper for internal use
exports.createNotification = createNotification;
