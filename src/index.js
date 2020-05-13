const config = require("./config");
const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./_helpers/errorHandler");
const connectDB = require("./database");
const useRouter = require("./rest");

const mount = async (app) => {
  const db = await connectDB();
  // Test Routes to check if the server is working properly or, not
  app.get("/status", (req, res) => {
    return res.sendStatus(200).end();
  });

  app.head("/status-head", (req, res) => {
    res.sendStatus(200).end();
  });

  // Transform the raw payload to useful data
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(useRouter);

  // Handle the errors at Global level
  app.use(errorHandler);

  app.listen(config.port, () => {
    console.log(`🚀 Server started on PORT:${config.port}`);
  });
};

mount(express());
