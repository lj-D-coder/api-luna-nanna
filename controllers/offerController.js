import { Offer } from "../models/offerSchema.js";

export const getOffer = async (req, res) => {
    try {
        const offers = await Offer.find(); // 1 for ascending order
        res.status(200).json({ success: true, offers });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const addOffer = async (req, res) => {
    try {
        const offer = req.body;
        const newOffer = new Offer(offer);
        await newOffer.save();
        res.status(201).json({ success: true, newOffer });
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
};



export const deleteOffer = async (req, res, next) => {
    try {
        await Offer.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Data Deleted Successfully" });
    } catch (error) {
        next(errorHandler);
    }
};