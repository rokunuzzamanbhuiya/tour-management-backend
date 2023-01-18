const express = require("express");
const router = express.Router();
const toursController = require("../../controllers/tours.controller");

router
  .route("/")
  .get(toursController.getTours)
  .post(toursController.createTour);

module.exports = router;
