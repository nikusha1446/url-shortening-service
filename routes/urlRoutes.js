import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: 'Create short URL endpoint' });
});

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
