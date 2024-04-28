import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  bannerUrl: { type: String, required: true },
  serviceId: { type: String, required: true },
});

export const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

