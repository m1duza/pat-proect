import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: '/pat-proect2/', // Замените 'your-repo-name' на имя вашего репозитория

});
