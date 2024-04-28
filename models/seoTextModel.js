import mongoose from 'mongoose';

const SeotextSchema = new mongoose.Schema({
    text:{type:Array}
});

export const Seotext = mongoose.models.Seotext || mongoose.model('Seotext', SeotextSchema);

