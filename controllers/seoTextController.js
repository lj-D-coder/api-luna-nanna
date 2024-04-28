import { Seotext } from "../models/seoTextModel.js";

export const getSeotext = async (req, res) => {
  try {
    const seotext = await Seotext.find(); // 1 for ascending order
    res.status(200).json({ success: true, seotext });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNewSeoText = async (req, res) => {
    const seotext = req.body;
    try {
      // Find the SEO text by ID and update it to push a new element into the text array
      const updatedSeoText = await Seotext.findByIdAndUpdate(
        seotext.id,
        { $push: { text: seotext.newText } },
        { new: true } // To return the updated document
      );
      
      if (!updatedSeoText) {
        return res.status(404).json({ message: "SEO text not found" });
      }
  
      // Send the updated SEO text in the response
      res.status(200).json({ success: true, seotext: updatedSeoText });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };

  export const removeText = async (req, res) => {
    const { id, textToRemove } = req.body;
    try {
        console.log(id);
        console.log(textToRemove);
      // Find the SEO text by ID and update it to pull the specified text from the array
      const updatedSeoText = await Seotext.findByIdAndUpdate(
        id,
        { $pull: { text: textToRemove } },
        { new: true } // To return the updated document
      );
      
      if (!updatedSeoText) {
        return res.status(404).json({ message: "SEO text not found" });
      }
  
      // Send the updated SEO text in the response
      res.status(200).json({ success: true, seotext: updatedSeoText });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }

};
