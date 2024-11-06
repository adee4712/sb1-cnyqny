import { Router } from 'express';
import { searchRouter } from './search.js';

export const router = Router();

router.use('/search', searchRouter);