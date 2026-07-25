/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * The site deploys to GitHub Pages as a folder of static files (see
   * .github/workflows/nextjs.yml, which uploads ./out). Declaring the export
   * here rather than leaving the Pages action to inject it means a local
   * `next build` fails on anything the export cannot support, instead of the
   * failure only showing up in CI.
   */
  output: "export",

  images: {
    // No image-optimization server exists on Pages, so next/image must serve
    // the original files. Sizing still comes from utils/imageDimensions.json.
    unoptimized: true,
  },
};

export default nextConfig;
