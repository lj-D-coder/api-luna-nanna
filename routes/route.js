import express from 'express';
const router = express.Router();
import { createCategory, getCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { getHeroes, createHero, updateHero, deleteHero } from '../controllers/heroSliderController.js';

//category icons 
router.post('/category', createCategory);
router.get('/category', getCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

//hero sliders
router.get('/hero-slider', getHeroes);
router.post('/hero-slider', createHero);
router.put('/hero-slider/:id', updateHero);
router.delete('/hero-slider/:id', deleteHero);

export default router;




