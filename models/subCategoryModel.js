import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
    categoryId: {type:String,required:true},
    subCategoryName: { type: String, required: true },
    subCategoryLabel: { type: String, required: true },
    iconUrl: { type: String, required: true },
    orderNo: { type: Number }
});

// Define a pre-save hook to auto-increment the orderNo field
SubcategorySchema.pre('save', async function(next) {
    try {
        if (!this.isNew) {
            // If the document is not new, do not auto-increment
            return next();
        }
        const latestSubCategory = await this.constructor.findOne({}, {}, { sort: { 'orderNo': -1 } });
        if (latestSubCategory) {
            // Increment the orderNo field by 1 compared to the latest document
            this.orderNo = latestSubCategory.orderNo + 1;
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
export const Subcategory = mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);