import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    base: "/babylonjs-pwa/",
    plugins: [
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: [
                "android-chrome-192x192.png",
                "android-chrome-512x512.png",
                "apple-touch-icon.png",
                "browserconfig.xml",
                "favicon-16x16.png",
                "favicon-32x32.png",
                "favicon.ico",
                "favicon.svg",
                "mstile-144x144.png",
                "mstile-150x150.png",
                "mstile-310x150.png",
                "mstile-310x310.png",
                "mstile-70x70.png",
                "robots.txt",
                "safari-pinned-tab.svg",
            ],
            manifest: {
                name: "PWA Sample with Babylon.js",
                short_name: "BJS_PWA",
                description: "Progressive Web Apps sample with Babylon.js",
                theme_color: "#FFFFFF",
                icons: [
                    {
                        src: "android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    },
                    {
                        src: "android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],
});
