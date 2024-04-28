import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  sliderUrl: { type: String, required: true },
  serviceId: { type: String, required: true },
  sliderOrder: { type: Number }
});

// Define a pre-save hook to auto-increment the orderNo field
HeroSchema.pre('save', async function(next) {
    try {
        if (!this.isNew) {
            // If the document is not new, do not auto-increment
            return next();
        }
        const latestHero = await this.constructor.findOne({}, {}, { sort: { 'sliderOrder': -1 } });
        if (latestHero) {
            // Increment the orderNo field by 1 compared to the latest document
            this.sliderOrder = latestHero.sliderOrder + 1;
        } else {
            // If there are no documents yet, set orderNo to 1
            this.sliderOrder = 1;
        }
        return next();
    } catch (error) {
        return next(error);
    }
});

export const Hero = mongoose.models.Hero || mongoose.model('Hero', HeroSchema);

