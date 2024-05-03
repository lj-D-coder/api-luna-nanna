import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
  title: { type: String, },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true, },
  serviceCapacity: { type: Number, required: true, },
  images: { type: Array, required: true, },
  offersDetails: { type: String, },
});

export const Offer = mongoose.models.Offer || mongoose.model('Offers', OfferSchema);