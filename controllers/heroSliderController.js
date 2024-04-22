import { Hero } from "../models/heroSliderModel.js";

export const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ sliderOrder: 1 }); // 1 for ascending order
    res.status(200).json(heroes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createHero = async (req, res) => {
  const hero = req.body;
  const newHero = new Hero(hero);
  try {
    await newHero.save();
    res.status(201).json(newHero);
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

export const deleteHero = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No hero with that id");

  await Hero.findByIdAndRemove(_id);

  res.json({ message: "Hero deleted successfully" });
};
