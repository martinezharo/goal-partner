// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],

    server: {
      // The dev server is reached through the host machine's Tailscale
      // hostname, and Vite rejects Host headers it doesn't recognise
      // (DNS-rebinding protection). That hostname belongs to the machine, not
      // to this repository — hardcoding it would break the day the dev box is
      // rebuilt elsewhere — so it comes from DEV_ALLOWED_HOSTS (comma-
      // separated). Unset means "localhost only", which is Vite's default.
      allowedHosts: (process.env.DEV_ALLOWED_HOSTS ?? '')
        .split(',')
        .map((host) => host.trim())
        .filter(Boolean)
    }
  },

});