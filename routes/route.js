import express from 'express';
const router = express.Router();
import { createCategory, getCategory, updateCategory, deleteCategory, updateOrderNo } from '../controllers/categoryController.js';
import { createSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, updateSubCategoryOrderNo, subCategoryUnderCategory} from '../controllers/subCategoryController.js';
import { getHeroes, createHero, updateHero, deleteHero, updateOrderNoHero } from '../controllers/heroSliderController.js';
import { getServices, createService,servicesUnderCategory,servicesUnderSubCategory, updateService, deleteService } from '../controllers/service_controller.js';
import { getSeotext, addNewSeoText, removeText } from '../controllers/seoTextController.js';
import { getBanner, changeBanner,deleteBanner } from '../controllers/bannerController.js';



//category icons 
router.post('/category', createCategory);
router.get('/category', getCategory);
router.patch('/category/:id', updateCategory);
router.post('/updateOrderNo', updateOrderNo);
router.delete('/category/:id', deleteCategory);


//subCategory 
router.post('/sub-category', createSubCategory);
router.get('/sub-category', getSubCategory);
router.patch('/sub-category/:id', updateSubCategory);
router.get('/sub-category-under-category',subCategoryUnderCategory)
router.post('/updateSubCategoryOrderNo',updateSubCategoryOrderNo);
router.delete('/sub-category/:id', deleteSubCategory);

//hero sliders
router.get('/hero-slider', getHeroes);
router.post('/hero-slider', createHero);
router.put('/hero-slider/:id', updateHero);
router.post('/update-hero-order', updateOrderNoHero);
router.delete('/hero-slider/:id', deleteHero);

//banner
router.get('/banner', getBanner);
router.post('/banner', changeBanner);
route.delete('/banner/:id',deleteBanner);

//services
router.get("/services", getServices)
router.post("/services", createService)
router.get("/services-under-category",servicesUnderCategory)
router.get("/services-under-subcategory",servicesUnderSubCategory)
router.patch('/services/:id', updateService);
router.delete('/services/:id',deleteService)

//seotext
router.get("/seo-text", getSeotext)
router.post("/seo-text", addNewSeoText)
router.post("/delete-seo-text", removeText)


export default router;