import { expect, test } from '@playwright/test';

const SECTION_IDS = [
  'abertura',
  'problema',
  'ideia',
  'como-funciona',
  'mapa',
  'previsao',
  'entrega',
  'limitacoes',
  'sobre',
  'encerramento',
];

test('abre com o título Arboviroses e o subtítulo', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: 'Arboviroses' })).toBeVisible();
  await expect(page.getByText('Como dados e Machine Learning')).toBeVisible();
});

test('todas as 10 seções da narrativa estão presentes', async ({ page }) => {
  await page.goto('/');
  for (const id of SECTION_IDS) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
});

test('não há rolagem horizontal', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
  expect(overflow).toBeFalsy();
});

test('o seletor de doença troca os dados do gráfico', async ({ page }) => {
  await page.goto('/');
  await page.locator('#previsao').scrollIntoViewIfNeeded();

  const chart = page.locator('#previsao [role="img"]');
  await expect(chart).toHaveAttribute('aria-label', /Dengue/);

  await page.getByRole('radio', { name: 'Zika' }).click();
  await expect(chart).toHaveAttribute('aria-label', /Zika/);

  // A tabela acessível reflete a troca.
  await page.locator('#previsao summary').click();
  await expect(page.locator('#previsao caption')).toContainText('Zika');
});

test('o marcador de Canasvieiras abre e fecha a ficha', async ({ page }) => {
  await page.goto('/');
  await page.locator('#mapa').scrollIntoViewIfNeeded();

  await page.getByRole('button', { name: /Canasvieiras/ }).click();
  const card = page.getByRole('dialog', { name: /Canasvieiras/ });
  await expect(card).toBeVisible();
  await expect(card.getByText('Área demonstrativa')).toBeVisible();

  await card.getByRole('button', { name: 'Fechar' }).click();
  await expect(card).toBeHidden();
});
