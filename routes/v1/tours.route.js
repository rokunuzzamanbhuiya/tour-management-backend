const express = require("express");
const router = express.Router();
const toursController = require("../../controllers/tours.controller");

router.route("/bulk-delete").delete(toursController.bulkDeleteTours);
router.route("/bulk-update").patch(toursController.bulkUpdateTours);

router
  .route("/")
  .get(toursController.getTours)
  .post(toursController.createTour);

router.route("/:id").get(toursController.getTourById);

module.exports = router;
