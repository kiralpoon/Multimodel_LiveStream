// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server/node_modules/.pnpm/vite@5.4.3_@types+node@22.10.3_less@4.2.0/node_modules/vite/dist/node/index.js";
import vue from "file:///mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.3_@types+node@22.10.3_less@4.2.0__vue@3.5.0/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Icons from "file:///mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.0/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server/node_modules/.pnpm/unplugin-icons@0.19.3_@vue+compiler-sfc@3.5.0/node_modules/unplugin-icons/dist/resolver.js";
import AutoImport from "file:///mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server/node_modules/.pnpm/unplugin-auto-import@0.18.2_@vueuse+core@11.0.3_vue@3.5.0__rollup@4.21.2/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.6_rollup@4.21.2_vue@3.5.0/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.25.6_rollup@4.21.2_vue@3.5.0/node_modules/unplugin-vue-components/dist/resolvers.js";
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "/mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server";
var __vite_injected_original_import_meta_url = "file:///mnt/d/Projects/MiniCPM-o/web_demos/minicpm-o_2.6/web_server/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon"
        })
      ],
      imports: ["vue", "vue-router", "@vueuse/core"],
      dirs: ["src/apis/**/*", "src/hooks/*"],
      vueTemplate: true,
      eslintrc: {
        enabled: true
      }
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"]
        })
      ],
      dirs: ["src/components"]
    }),
    Icons({
      autoInstall: true
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import 'src/styles/element/index.less';`
      }
    }
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__vite_injected_original_dirname, "key.pem")),
      cert: fs.readFileSync(path.resolve(__vite_injected_original_dirname, "cert.pem"))
    },
    host: "0.0.0.0",
    port: 8088,
    proxy: {
      "/api/v1": {
        target: "http://127.0.0.1:32550",
        ws: true,
        changeOrigin: true
      },
      "/ws": {
        target: "http://127.0.0.1:32550",
        ws: true,
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2QvUHJvamVjdHMvTWluaUNQTS1vL3dlYl9kZW1vcy9taW5pY3BtLW9fMi42L3dlYl9zZXJ2ZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvZC9Qcm9qZWN0cy9NaW5pQ1BNLW8vd2ViX2RlbW9zL21pbmljcG0tb18yLjYvd2ViX3NlcnZlci92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2QvUHJvamVjdHMvTWluaUNQTS1vL3dlYl9kZW1vcy9taW5pY3BtLW9fMi42L3dlYl9zZXJ2ZXIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xyXG4vLyBpbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJztcclxuXHJcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJztcclxuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInO1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAgdnVlKCksXHJcbiAgICAgICAgLy8gdnVlRGV2VG9vbHMoKSxcclxuICAgICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksIC8vIEF1dG8gaW1wb3J0IGljb24gY29tcG9uZW50c1xyXG4gICAgICAgICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XHJcbiAgICAgICAgICAgICAgICBJY29uc1Jlc29sdmVyKHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6ICdJY29uJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlcicsICdAdnVldXNlL2NvcmUnXSxcclxuICAgICAgICAgICAgZGlyczogWydzcmMvYXBpcy8qKi8qJywgJ3NyYy9ob29rcy8qJ10sXHJcbiAgICAgICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgQ29tcG9uZW50cyh7XHJcbiAgICAgICAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLCAvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcclxuICAgICAgICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogWydlcCddXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICBkaXJzOiBbJ3NyYy9jb21wb25lbnRzJ11cclxuICAgICAgICB9KSxcclxuICAgICAgICBJY29ucyh7XHJcbiAgICAgICAgICAgIGF1dG9JbnN0YWxsOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIF0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY3NzOiB7XHJcbiAgICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgICAgICBsZXNzOiB7XHJcbiAgICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgJ3NyYy9zdHlsZXMvZWxlbWVudC9pbmRleC5sZXNzJztgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgaHR0cHM6IHtcclxuICAgICAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2tleS5wZW0nKSksXHJcbiAgICAgICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnY2VydC5wZW0nKSksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgICAgcG9ydDogODA4OCxcclxuICAgICAgICBwcm94eToge1xyXG4gICAgICAgICAgICAnL2FwaS92MSc6IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6MzI1NTAnLFxyXG4gICAgICAgICAgICAgICAgd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy93cyc6IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly8xMjcuMC4wLjE6MzI1NTAnLFxyXG4gICAgICAgICAgICAgICAgd3M6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1csU0FBUyxlQUFlLFdBQVc7QUFFelksU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBR2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFaakIsSUFBTSxtQ0FBbUM7QUFBdUwsSUFBTSwyQ0FBMkM7QUFjalIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBO0FBQUEsSUFFSixXQUFXO0FBQUEsTUFDUCxXQUFXO0FBQUEsUUFDUCxvQkFBb0I7QUFBQTtBQUFBO0FBQUEsUUFFcEIsY0FBYztBQUFBLFVBQ1YsUUFBUTtBQUFBLFFBQ1osQ0FBQztBQUFBLE1BQ0w7QUFBQSxNQUNBLFNBQVMsQ0FBQyxPQUFPLGNBQWMsY0FBYztBQUFBLE1BQzdDLE1BQU0sQ0FBQyxpQkFBaUIsYUFBYTtBQUFBLE1BQ3JDLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNiO0FBQUEsSUFDSixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDUCxXQUFXO0FBQUEsUUFDUCxvQkFBb0I7QUFBQTtBQUFBLFFBQ3BCLGNBQWM7QUFBQSxVQUNWLG9CQUFvQixDQUFDLElBQUk7QUFBQSxRQUM3QixDQUFDO0FBQUEsTUFDTDtBQUFBLE1BQ0EsTUFBTSxDQUFDLGdCQUFnQjtBQUFBLElBQzNCLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxNQUNGLGFBQWE7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNELHFCQUFxQjtBQUFBLE1BQ2pCLE1BQU07QUFBQSxRQUNGLGdCQUFnQjtBQUFBLE1BQ3BCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE9BQU87QUFBQSxNQUNILEtBQUssR0FBRyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxTQUFTLENBQUM7QUFBQSxNQUN2RCxNQUFNLEdBQUcsYUFBYSxLQUFLLFFBQVEsa0NBQVcsVUFBVSxDQUFDO0FBQUEsSUFDN0Q7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNILFdBQVc7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxRQUNKLGNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsT0FBTztBQUFBLFFBQ0gsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLFFBQ0osY0FBYztBQUFBLE1BQ2xCO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
