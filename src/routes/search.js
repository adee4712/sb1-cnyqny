import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { searchProducts } from '../services/searchService.js';

export const searchRouter = Router();

const searchLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 10,
  message: { error: 'Daily search limit reached. Please try again tomorrow.' }
});

searchRouter.use(searchLimiter);

searchRouter.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return res.status(400).json({ error: 'Valid search query is required' });
    }

    const results = await searchProducts(query.trim());
    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to perform search' });
  }
});