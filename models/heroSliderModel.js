import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  sliderUrl: { type: String, required: true },
  serviceId: { type: String, required: true },
  sliderOrder: { type: Number, required: true }
});

export const Hero = mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
