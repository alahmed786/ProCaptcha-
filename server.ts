import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const supabaseAdmin = createClient(
    process.env.VITE_SUPABASE_URL || 'https://fake.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-key'
  );

  // Endpoint to save generation if needed, though frontend can do it too
  app.post('/api/save-generation', async (req, res) => {
    try {
      const { promptText, generatedText, userId } = req.body;
      
      if (userId) {
        try {
          await supabaseAdmin.from('generations').insert({
            user_id: userId,
            prompt: promptText,
            output: generatedText,
            model: 'puter'
          });
        } catch (dbErr) {
          console.error("Failed to save to supabase (table might not exist):", dbErr);
        }
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
