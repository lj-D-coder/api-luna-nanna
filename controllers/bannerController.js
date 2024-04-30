import { Banner } from "../models/bannerModel.js";

export const getBanner = async (req, res) => {
  try {
    const banners = await Banner.find(); // 1 for ascending order
    res.status(200).json({ success: true, banners });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const changeBanner = async (req, res) => {
  const banner = req.body;
  const newBanner = new Banner(banner);
  
  try {
    // Retrieve all existing banners
    const existingBanners = await Banner.find();
    
    // Delete each existing banner file
    existingBanners.forEach(async (banner) => {
      try {
        // Delete the existing banner from the database
        await Banner.findByIdAndDelete(banner._id);
      } catch (error) {
        // Handle error while deleting existing banner
        console.error("Error deleting existing banner:", error);
      }
    });
    // Save the new banner
    await newBanner.save();
    res.status(201).json({ success: true, newBanner });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Data Deleted Successfully" });
  } catch (error) {
    next(errorHandler);
  }
};