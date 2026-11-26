import { readFile, writeFile, mkdir } from "node:fs/promises";
import { render } from "../.ssr/entry-server.js";
const data = JSON.parse(
  await readFile("frontend/src/data/content.json", "utf8"),
);
const template = await readFile("dist/index.html", "utf8");
const routes = [
  ["/", "Dari alam, dengan sepenuh hati"],
  ["/about", "Tentang Kami"],
  ["/products", "Produk Kebun"],
  ["/farm-experience", "Farm Experience"],
  ["/gallery", "Galeri"],
  ["/stories", "Cerita dari Kebun"],
  ["/contact", "Hubungi Kami"],
  ["/privacy-policy", "Kebijakan Privasi"],
  ...data.products
    .filter((x) => x.is_active)
    .map((x) => [`/products/${x.slug}`, x.name]),
  ...data.programs
    .filter((x) => x.is_active)
    .map((x) => [`/farm-experience/${x.slug}`, x.title]),
  ...data.articles
    .filter((x) => x.status === "published")
    .map((x) => [`/stories/${x.slug}`, x.title]),
];
const escape = (x) =>
  x.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const origin = process.env.SITE_URL?.replace(/\/$/, "");
for (const [path, title] of routes) {
  const html = render(path);
  let out = template
    .replace("<!--app-html-->", html)
    .replace(
      /<title>.*?<\/title>/,
      `<title>${escape(title)} | Gema Farm</title>`,
    );
  if (origin)
    out = out.replace(
      "</head>",
      `<link rel="canonical" href="${escape(origin + path)}"/><meta property="og:title" content="${escape(title)} | Gema Farm"/><meta property="og:image" content="${escape(origin)}/images/farm.webp"/></head>`,
    );
  const dir = `dist${path === "/" ? "" : path}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, out);
}
await writeFile(
  "dist/404.html",
  template.replace("<!--app-html-->", render("/not-found")),
);
if (origin) {
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(([p]) => `<url><loc>${escape(origin + p)}</loc></url>`).join("")}</urlset>`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nDisallow: /admin\nSitemap: ${origin}/sitemap.xml\n`,
  );
} else await writeFile("dist/robots.txt", "User-agent: *\nDisallow: /admin\n");
console.log(
  `Prerendered ${routes.length} public pages. ${origin ? "Sitemap generated." : "Set SITE_URL at build time for canonical URLs and sitemap."}`,
);
