import express from 'express';
import {
  createShortUrl,
  deleteUrl,
  getOriginalUrl,
  updateUrl,
} from '../controllers/urlController.js';
const router = express.Router();

router.post('/', createShortUrl);

router.get('/:shortCode', getOriginalUrl);

router.put('/:shortCode', updateUrl);

router.delete('/:shortCode', deleteUrl);

router.get('/:shortCode/stats', (req, res) => {
  res.json({ message: 'Get URL statistics endpoint' });
});

export default router;
