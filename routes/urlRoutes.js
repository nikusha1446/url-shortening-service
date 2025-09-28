import express from 'express';
import { createShortUrl } from '../controllers/urlController.js';
const router = express.Router();

router.post('/', createShortUrl);

router.get('/:shortCode', (req, res) => {
  res.json({ message: 'Get original URL endpoint' });
});

router.put('/:shortCode', (req, res) => {
  res.json({ message: 'Update URL endpoint' });
});

router.delete('/:shortCode', (req, res) => {
  res.json({ message: 'Delete URL endpoint' });
});

router.get('/:shortCode/stats', (req, res) => {
  res.json({ message: 'Get URL statistics endpoint' });
});

export default router;
