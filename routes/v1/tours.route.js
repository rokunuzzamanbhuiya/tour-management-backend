const express = require("express");
const router = express.Router();
const toursController = require("../../controllers/tours.controller");

router
  .route("/")
  .get(toursController.getTours)
  .post(toursController.createTour);

router.route("/:id").get(toursController.getTourById);
// .patch(productController.updateProductById)
// .delete(productController.deleteProductById);

module.exports = router;
