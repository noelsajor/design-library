import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Add this for GitHub Pages deployment
const repoName = 'design-library'; // Change if your repo name is different

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`,
})
