const { test, expect } = require("@playwright/test");

test("Formulário de Previsão do Tempo", async ({ page }) => {
  await page.goto("https://elisirons.github.io/condicaoDoTempo/");
  await page.fill("#input-localizacao", "Capitólio");
  await page.click("#button-localizacao");
  await page.waitForSelector("#tempo-info");

  const temperatura = await page.locator("#tempo-info span").textContent();
  expect(temperatura).not.toBeNull();
  expect(temperatura.length).toBeGreaterThan(0);

  const local = await page.locator("#tempo-info h2").textContent();
  expect(local).toEqual("Capitólio");
});
