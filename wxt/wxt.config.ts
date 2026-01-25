import { defineConfig, type WxtViteConfig } from 'wxt';
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  vite: () => ({
    plugins: [tailwindcss()],
  } as WxtViteConfig),
  manifest: {
    permissions: ["activeTab"],
    host_permissions: ["http://127.0.0.1:3000/*"]
  }
});
