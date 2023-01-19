const express = require("express");
const router = express.Router();
const toursController = require("../../controllers/tours.controller");

router
  .route("/")
  .get(toursController.getTours)
  .post(toursController.createTour);

router.route("/trending").get(toursController.getTrendingTour);

router.route("/cheapest").get(toursController.getCheapestTour);

router
  .route("/:id")
  .get(toursController.getTourById)
  .patch(toursController.updateTourById)
  .delete(toursController.deleteTourById);

module.exports = router;
