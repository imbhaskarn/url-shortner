const express = require("express");

const gatewayRouter = express.Router();

gatewayRouter.get("/", (req, res) => {
  res.send("Welcome to the gateway server!");
});

module.exports = gatewayRouter;

