import { expect, test } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test('com movimento reduzido, todo o conteúdo permanece disponível', async ({ page }) => {
  await page.goto('/');

  // A abertura aparece normalmente.
  await expect(page.getByRole('heading', { level: 1, name: 'Arboviroses' })).toBeVisible();

  // Seções mais abaixo continuam legíveis (reveals viram estados estáticos).
  await page.locator('#limitacoes').scrollIntoViewIfNeeded();
  await expect(page.getByRole('heading', { name: 'Prever não é adivinhar.' })).toBeVisible();

  await page.locator('#sobre').scrollIntoViewIfNeeded();
  await expect(page.getByText('Kamilla')).toBeVisible();
});
