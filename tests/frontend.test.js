import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import React, { act } from "react";
let createRoot;
import { build } from "esbuild";
import { readFile } from "node:fs/promises";
let dom, store, forms, router, pages, admin, root, container, modules;
before(async () => {
  dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    { url: "http://localhost/" },
  );
  for (const key of [
    "window",
    "document",
    "localStorage",
    "sessionStorage",
    "HTMLElement",
    "HTMLInputElement",
    "HTMLTextAreaElement",
    "HTMLSelectElement",
    "Event",
    "MouseEvent",
    "FormData",
  ])
    globalThis[key] = dom.window[key];
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  ({ createRoot } = await import("react-dom/client"));
  globalThis.requestAnimationFrame = (cb) => cb();
  window.scrollTo = () => {};
  dom.window.HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  await build({
    stdin: {
      contents:
        "export * as store from './frontend/src/data/store.jsx'; export * as forms from './frontend/src/forms.jsx'; export * as pages from './frontend/src/pages.jsx'; export * as admin from './frontend/src/admin.jsx'; export {render} from './frontend/src/entry-server.jsx';",
      resolveDir: process.cwd(),
      loader: "jsx",
    },
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    outfile: ".ssr/test-modules.mjs",
  });
  modules = await import("../.ssr/test-modules.mjs");
  ({ store, forms, pages, admin } = modules);
  router = await import("react-router-dom");
  container = document.getElementById("root");
});
after(async () => {
  if (root) await act(() => root.unmount());
  dom?.window.close();
});
async function mount(Component, path = "/") {
  if (root) await act(() => root.unmount());
  localStorage.clear();
  root = createRoot(container);
  await act(async () =>
    root.render(
      React.createElement(
        router.MemoryRouter,
        { initialEntries: [path] },
        React.createElement(
          store.DataProvider,
          null,
          React.createElement(Component),
        ),
      ),
    ),
  );
}
async function click(el) {
  assert.ok(el, "Expected button exists");
  await act(() => el.dispatchEvent(new MouseEvent("click", { bubbles: true })));
}
function fill(name, value) {
  const el = container.querySelector(`[name="${name}"]`);
  assert.ok(el, `field ${name}`);
  el.value = value;
}
test("seed data has unique slugs, valid relationships and real local images", async () => {
  const d = JSON.parse(
    await readFile("frontend/src/data/content.json", "utf8"),
  );
  for (const type of ["products", "articles", "programs", "categories"]) {
    assert.equal(new Set(d[type].map((x) => x.slug)).size, d[type].length);
  }
  for (const p of d.products)
    assert.ok(d.categories.some((c) => c.id === p.category_id));
  for (const row of [...d.products, ...d.programs, ...d.gallery, ...d.articles])
    assert.ok((await readFile(`frontend/public${row.image}`)).length > 0);
  assert.equal(d.settings.whatsapp, "");
});
test("contact form rejects invalid phone and persists valid inquiry without fake transmission", async () => {
  await mount(forms.RequestForm, "/contact");
  fill("name", "QA Pengunjung");
  fill("email", "qa@example.com");
  fill("phone", "abc");
  fill("message", "Permintaan pengujian frontend.");
  container.querySelector('[name="privacy_consent"]').checked = true;
  await act(() =>
    container
      .querySelector("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
  );
  assert.match(container.textContent, /nomor WhatsApp yang valid/);
  assert.equal(localStorage.getItem("gema-farm-demo-v1"), null);
  fill("phone", "081234567890");
  await act(() =>
    container
      .querySelector("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
  );
  const d = JSON.parse(localStorage.getItem("gema-farm-demo-v1"));
  assert.equal(d.inquiries.length, 1);
  assert.equal(d.inquiries[0].status, "new");
  assert.match(container.textContent, /Belum dikirim/);
});
test("visit request stores pending, never automatically confirmed", async () => {
  const seed = JSON.parse(
    await readFile("frontend/src/data/content.json", "utf8"),
  );
  await mount(() =>
    React.createElement(forms.RequestForm, { program: seed.programs[0] }),
  );
  fill("name", "QA Peserta");
  fill("email", "qa@example.com");
  fill("phone", "081234567890");
  fill("preferred_date", "2099-12-20");
  fill("participants", "12");
  fill("message", "Rencana kunjungan untuk pengujian frontend.");
  container.querySelector('[name="privacy_consent"]').checked = true;
  await act(() =>
    container
      .querySelector("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
  );
  const d = JSON.parse(localStorage.getItem("gema-farm-demo-v1"));
  assert.equal(d.visit_requests[0].status, "pending");
  assert.equal(d.visit_requests[0].participants, 12);
  assert.match(container.textContent, /bukan konfirmasi booking/);
});
test("catalog category filter returns only matching products", async () => {
  await mount(pages.Products);
  assert.equal(container.querySelectorAll(".product-card").length, 5);
  await click(
    [...container.querySelectorAll(".filter-tabs button")].find(
      (x) => x.textContent === "Sayuran Daun",
    ),
  );
  assert.equal(container.querySelectorAll(".product-card").length, 2);
  assert.match(container.textContent, /Pakcoy Hijau/);
  assert.ok(
    ![...container.querySelectorAll(".product-card")].some((x) =>
      x.textContent.includes("Paprika"),
    ),
  );
});
test("CMS editing updates browser JSON and confirms save", async () => {
  sessionStorage.setItem("gema-demo-access", "yes");
  await mount(admin.Admin, "/admin/products");
  await click(container.querySelector('[aria-label="Edit Pakcoy Hijau"]'));
  const dialog = container.querySelector("dialog");
  assert.ok(dialog);
  const input = [...dialog.querySelectorAll("label")]
    .find((x) => x.textContent.includes("Nama produk"))
    .querySelector("input");
  await act(() => {
    Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value",
    ).set.call(input, "Pakcoy Pilihan");
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
  await act(() =>
    dialog
      .querySelector("form")
      .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
  );
  assert.equal(
    JSON.parse(localStorage.getItem("gema-farm-demo-v1")).products.find(
      (x) => x.id === "1",
    ).name,
    "Pakcoy Pilihan",
  );
  assert.match(container.textContent, /Perubahan tersimpan/);
});
test("all public routes prerender meaningful content and product detail", async () => {
  const { render } = modules;
  for (const path of [
    "/",
    "/about",
    "/products",
    "/products/pakcoy-hijau",
    "/farm-experience",
    "/farm-experience/farm-discovery",
    "/gallery",
    "/stories",
    "/stories/mengenal-kesegaran",
    "/contact",
    "/privacy-policy",
  ]) {
    const html = render(path);
    assert.match(html, /<h1/);
    assert.ok(html.length > 5000, path);
    assert.ok(!html.includes("Jalurnya belum ditemukan."), path);
  }
  assert.match(render("/unknown-route"), /Jalurnya belum ditemukan/);
});
