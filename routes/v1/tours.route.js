const express = require("express");
const router = express.Router();
const toursController = require("../../controllers/tours.controller");

router.route("/").get(toursController.getTours);

module.exports = router;
