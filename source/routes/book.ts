import express from 'express';
import controller from '../controllers/book';

const router = express.Router();

router.put('/update-book/:id', controller.updateBook);
router.post('/create/book', controller.createBook);
router.get('/get/book', controller.getAllBooks);

export = router;
