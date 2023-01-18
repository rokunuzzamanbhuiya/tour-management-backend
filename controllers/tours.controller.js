const {
  getToursService,
  createTourService,
} = require("../services/tours.service");

exports.getTours = async (req, res, next) => {
  try {
    //{price:{$gt:50}
    //{ price: { gt: '50' } }
    console.log(req.query);

    let filters = { ...req.query };

    //sort, page, limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt, lt, gte, lte, in, nin, exists, expr
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte|in|nin|exists)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      // price, qunatity   -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query; // "3" "10"
      //50 tours
      // each page 10 tour
      //page 1--> 1-10
      //page 2--> 11-20
      //page 3--> 21-30     --> page 3 --> skip 1-20  --> 3-1 --> 2*10
      //page 4--> 31-40     --> page 4 --> skip 1-30  --> 4-1 --> 3*10
      //page 5--> 41-50

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const tours = await getToursService(filters, queries);

    res.status(200).json({
      status: "success",
      data: tours,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Can't get the data",
      error: error.message,
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    // save or create

    const result = await createTourService(req.body);

    res.status(200).json({
      status: "success",
      messgae: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};
