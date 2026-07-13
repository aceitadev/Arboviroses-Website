import { expect, test } from '@playwright/test';

test('navegação mobile: menu abre, navega e fecha', async ({ page }) => {
  const size = page.viewportSize();
  test.skip(!size || size.width >= 768, 'Apenas no layout mobile.');

  await page.goto('/');
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeHidden();

  await page.getByRole('button', { name: /Abrir menu/ }).click();
  await expect(menu).toBeVisible();

  await menu.getByRole('link', { name: 'Mapa' }).click();
  // Ao selecionar um item, o menu fecha.
  await expect(menu).toBeHidden();
  await expect(page.locator('#mapa')).toBeInViewport({ ratio: 0.1 });
});

test('navegação desktop: barra horizontal com os links', async ({ page }) => {
  const size = page.viewportSize();
  test.skip(!size || size.width < 768, 'Apenas no layout desktop.');

  await page.goto('/');
  for (const label of ['Projeto', 'Funcionamento', 'Mapa', 'Previsão', 'Equipe']) {
    await expect(page.getByRole('link', { name: label, exact: true })).toBeVisible();
  }

  await page.getByRole('link', { name: 'Previsão', exact: true }).click();
  await expect(page.locator('#previsao')).toBeInViewport({ ratio: 0.1 });
});
