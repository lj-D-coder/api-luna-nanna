import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryLabel: { type: String, required: true },
    iconUrl: { type: String, required: true },
    orderNo: { type: Number, required: true }
});



export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
