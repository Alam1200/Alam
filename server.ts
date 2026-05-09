import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mock AI Subtitle Removal Endpoint
  app.post('/api/remove-subtitles', (req, res) => {
    const { projectId, videoUrl } = req.body;
    
    if (!projectId || !videoUrl) {
      return res.status(400).json({ error: 'Missing projectId or videoUrl' });
    }

    // In a real app, this would trigger an FFmpeg/AI worker
    console.log(`Processing video for project ${projectId}: ${videoUrl}`);
    
    res.json({
      success: true,
      message: 'Processing started',
      estimatedTime: '2 minutes'
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CleanFrame AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
