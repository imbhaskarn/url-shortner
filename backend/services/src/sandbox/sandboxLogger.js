// sandboxLogger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'sandboxTransactions.log');

const logTransaction = (message) => {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error logging transaction:', err);
    }
  });
};

module.exports = { logTransaction };
