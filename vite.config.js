import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://ggboss101.github.io/PickupUBC/ (a subpath, not the
// domain root), so the production build needs every asset URL prefixed
// with /PickupUBC/. The dev server stays at the normal root for convenience.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/PickupUBC/' : '/',
}))
