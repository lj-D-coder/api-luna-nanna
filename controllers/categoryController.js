import { Category } from "../models/categoryModel.js";
import { errorHandler } from "../utils/error.js";
import { Service } from "../models/serviceModel.js";

export const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error)
    next(errorHandler);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.find().sort({ orderNo: 1 }); // Sorting by orderNo field in ascending order
    res.status(200).json({ success: true, category });
  } catch (error) {
    next(errorHandler);
  }
};


export const updateCategory = async (req, res, next) => {
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
    const category = await Category.findByIdAndUpdate(req.params.id, filteredUpdateFields, { new: true });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const updatedData = {
      category: category.categoryName,
      
    };
  
    const update = await Service.updateMany(
      { categoryId: category._id },
      {
        $set: updatedData,
      },
      { upsert: true }
    );

    if (!update) { 
      return res.status(404).json({ success: false, message: 'error in update' });
    }



    res.status(200).json({ success: true, updatedCategory: category });
  } catch (error) {
    console.log(error);
    next(errorHandler);
  }
};


export const updateOrderNo = async (req, res, next) => {
  try {
    const { idOne, idTwo } = req.body;

    // Find the documents corresponding to the provided IDs
    const docOne = await Category.findById(idOne);
    const docTwo = await Category.findById(idTwo);

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

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Data Deleted Successfully" });
  } catch (error) {
    next(errorHandler);
  }
};
