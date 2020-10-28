const express = require("express");
const ApiController = require("../controllers/ApiController");

const apiController = new ApiController();
const router = express.Router();
router.get("/", apiController.fetchDataFromUrl);

module.exports = router;
