import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,      
    strictPort: true   // nếu 8080 bị chiếm thì báo lỗi, không tự đổi port
  }
})
