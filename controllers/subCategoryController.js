import { Subcategory } from "../models/subCategoryModel.js";
import { errorHandler } from "../utils/error.js";
import { Service } from "../models/serviceModel.js";

export const createSubCategory = async (req, res, next) => {
  try {
    const subCategory = new Subcategory(req.body);
    await subCategory.save();
    res.status(200).json({ success: true, subCategory });
  } catch (error) {
    console.log(error)
    next(errorHandler);
  }
};

export const getSubCategory = async (req, res, next) => {
  try {
    const subCategories = await Subcategory.find().sort({ orderNo: 1 }); // Sorting by orderNo field in ascending order
    res.status(200).json({ success: true, subCategories });
  } catch (error) {
    next(errorHandler);
  }
};

export const subCategoryUnderCategory = async (req, res, next) => {
  try {
    var id = req.query["categoryId"];
    const subCategories = await Subcategory.find({ categoryId: id }).sort({ orderNo: 1 });;
    res.status(200).json({ success: true, subCategories });
  } catch (error) {
    console.log(error);
    next(errorHandler);
  }
};

export const updateSubCategoryOrderNo = async (req, res, next) => {
  try {
    const { idOne, idTwo } = req.body;

    // Find the documents corresponding to the provided IDs
    const docOne = await Subcategory.findById(idOne);
    const docTwo = await Subcategory.findById(idTwo);

    // Check if both documents exist
    if (!docOne || !docTwo) {
      return res.status(404).json({ success: false, message: 'One or more documents not found' });
    }

    // Interchange the orderNo values
    const tempOrderNo = docOne.orderNo;
    docOne.orderNo = docTwo.orderNo;
    docTwo.orderNo = tempOrderNo;

    // Save the changes
    await docOne.save();
    await docTwo.save();

    res.status(200).json({ success: true, message: 'OrderNo values interchanged successfully' });
  } catch (error) {
    console.log(error)
    next(errorHandler);
  }
};

export const updateSubCategory = async (req, res, next) => {
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
    const subCategory = await Subcategory.findByIdAndUpdate(req.params.id, filteredUpdateFields, { new: true });

    if (!subCategory) {
      return res.status(404).json({ success: false, message: 'Sub Category not found' });
    }


    const updatedData = {
      subCategory: subCategory.subCategoryName,
      
    };
  
    const update = await Service.updateMany(
      { subCategoryId: subCategory._id },
      {
        $set: updatedData,
      },
      { upsert: true }
    );

    if (!update) { 
      return res.status(404).json({ success: false, message: 'error in update' });
    }

    res.status(200).json({ success: true, updatedSubCategory: subCategory });
  } catch (error) {
    console.log(error);
    next(errorHandler);
  }
};

export const deleteSubCategory = async (req, res, next) => {
  try {
    console.log(req);
    const subCategory = await Subcategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Data Deleted Successfully" });
  } catch (error) {
    console.log(error);
    next(errorHandler);
  }
};
