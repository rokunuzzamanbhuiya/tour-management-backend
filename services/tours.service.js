const Tour = require("../models/Tour");

exports.getToursService = async (filters, queries) => {
  const tours = await Tour.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const totalTours = await Tour.countDocuments(filters);
  const pageCount = Math.ceil(totalTours / queries.limit);
  return { totalTours, pageCount, tours };
};

exports.createTourService = async (data) => {
  const tour = await Tour.create(data);
  return tour;
};

exports.getTourByIdService = async (id) => {
  const tour = await Tour.findById(id);
  const incViewCount = await Tour.updateOne(
    { _id: id },
    { $inc: { views: 1 } }
  );
  return { incViewCount, tour };
};

exports.updateTourByIdService = async (id, data) => {
  const tour = await Tour.findById(id);
  const result = await tour.set(data).save();
  return result;
};

exports.getTrendingTourService = async () => {
  const tours = await Tour.find({}).sort({ views: -1 }).limit(3);
  return tours;
};

exports.getCheapestTourService = async () => {
  const tours = await Tour.find({}).sort({ price: 1 }).limit(3);
  return tours;
};

exports.deleteTourByIdService = async (id) => {
  const result = await Tour.deleteOne({ _id: id });
  return result;
};
