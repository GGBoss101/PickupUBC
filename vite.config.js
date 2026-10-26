import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://ggboss101.github.io/PickupUBC/ (a subpath, not the
// domain root), so the production build needs every asset URL prefixed
// with /PickupUBC/ (as does `vite preview`, which serves that build).
// The dev server stays at the normal root for convenience.
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base: command === 'build' || isPreview ? '/PickupUBC/' : '/',
}))
