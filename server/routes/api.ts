import { Router } from 'express';
import { handleGenerateImage, handleGetConfig } from '../controllers/generationController';
import { DEVOTIONAL_STYLES } from '../../src/data/devotionalStyles';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'BhaktiVision AI Engine', timestamp: new Date().toISOString() });
});

router.get('/config', handleGetConfig);

router.get('/styles', (_req, res) => {
  res.json({ styles: DEVOTIONAL_STYLES });
});

router.post('/generate', handleGenerateImage);

export default router;
