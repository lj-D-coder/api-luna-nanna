import { Hero } from "../models/heroSliderModel.js";
import mongoose from 'mongoose'; // Import mongoose module

export const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ sliderOrder: 1 }); // 1 for ascending order
    res.status(200).json({ success: true, heroes });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createHero = async (req, res) => {
  const hero = req.body;
  const newHero = new Hero(hero);
  try {
    await newHero.save();
    res.status(201).json({ success: true, newHero});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateHero = async (req, res) => {
  const { id: _id } = req.params;
  const hero = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No hero with that id");

  const updatedHero = await Hero.findByIdAndUpdate(_id, hero, { new: true });

  res.json(updatedHero);
};

export const updateOrderNoHero = async (req, res, next) => {
  try {
    const { idOne, idTwo } = req.body;

    // Find the documents corresponding to the provided IDs
    const docOne = await Hero.findById(idOne);
    const docTwo = await Hero.findById(idTwo);

    // Check if both documents exist
    if (!docOne || !docTwo) {
      return res.status(404).json({ success: false, message: 'One or more documents not found' });
    }

    // Interchange the orderNo values
    const tempOrderNo = docOne.sliderOrder;
    docOne.sliderOrder = docTwo.sliderOrder;
    docTwo.sliderOrder = tempOrderNo;

    // Save the changes
    await docOne.save();
    await docTwo.save();

    res.status(200).json({ success: true, message: 'OrderNo values interchanged successfully' });
  } catch (error) {
    console.log(error)
    next(errorHandler);
  }
};

export const deleteHero = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No hero with that id");

  await Hero.findByIdAndRemove(_id);

  res.json({success: true, message: "Hero deleted successfully" });
};

