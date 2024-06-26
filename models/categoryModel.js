import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryLabel: { type: String, required: true },
    iconUrl: { type: String, required: true },
    orderNo: { type: Number }
});

// Define a pre-save hook to auto-increment the orderNo field
CategorySchema.pre('save', async function(next) {
    try {
        if (!this.isNew) {
            // If the document is not new, do not auto-increment
            return next();
        }
        const latestCategory = await this.constructor.findOne({}, {}, { sort: { 'orderNo': -1 } });
        if (latestCategory) {
            // Increment the orderNo field by 1 compared to the latest document
            this.orderNo = latestCategory.orderNo + 1;
        } else {
            // If there are no documents yet, set orderNo to 1
            this.orderNo = 1;
        }
        return next();
    } catch (error) {
        return next(error);
    }
});

// Export your model
export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);