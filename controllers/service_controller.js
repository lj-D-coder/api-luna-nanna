import { Service } from "../models/serviceModel.js";
import { errorHandler } from "../utils/error.js";

export const createService = async (req, res, next) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(200).json({ success: true, service });
  } catch (error) {
    console.log(error)
    next(errorHandler);
  }
};

export const servicesUnderCategory = async (req, res, next) => {
  try {
    var id = req.query["categoryId"];
    const services = await Service.find({ categoryId: id });
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.log(error);
    next(errorHandler);
  }
};

export const servicesUnderSubCategory = async (req, res, next) => {
  try {
    var id = req.query["subCategoryId"];
    const services = await Service.find({ subCategoryId: id });
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.log(error);
    next(errorHandler);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find(); // Sorting by orderNo field in ascending order
    res.status(200).json({ success: true, services });
  } catch (error) {
    next(errorHandler);
  }
};


export const updateService = async (req, res, next) => {
  try {
    // Get the fields to update from req.body
    const { ...updateFields } = req.body;

    // Filter out null values from the updateFields
    const filteredUpdateFields = {};
    for (const key in updateFields) {
      if (updateFields[key] !== null) {
        filteredUpdateFields[key] = updateFields[key];
      }
    }

    // Update the category with the filtered fields
    const service = await Service.findByIdAndUpdate(req.params.id, filteredUpdateFields, { new: true });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    res.status(200).json({ success: true, updatedService: service });
  } catch (error) {
    console.log(error);
    next(errorHandler);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const serivce = await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Data Deleted Successfully" });
  } catch (error) {
    next(errorHandler);
  }
};
