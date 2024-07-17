import { test, expect } from '@playwright/test';
import { log } from 'console';

test('Successfull login', async ({ page }) => {
  await page.goto('https://relbuild.nanitor.net/');
  await page.getByRole('textbox').fill('max+84732754828@nanitor.com');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect.soft(page.locator('form')).toContainText('Password');
  await page.getByRole('textbox').fill('Password123!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Global dashboard' })).toContainText('Global dashboard');
});

test('Wrong Password login', async ({ page }) => {
  await page.goto('https://relbuild.nanitor.net/');
  await page.getByRole('textbox').fill('max+84732754828@nanitor.com');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect.soft(page.locator('form')).toContainText('Password');
  await page.getByRole('textbox').fill('Pasword123!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('paragraph')).toContainText('Invalid email or password');
});


test('Wrong Email login', async ({ page }) => {
  await page.goto('https://relbuild.nanitor.net/');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('max+8473@nanitor.com');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('paragraph')).toContainText('Looks like that e-mail address isn\'t connected to any account. Double-check your entry or contact your administrator.');
});

test('Logout', async ({page}) => {
  await page.goto('https://relbuild.nanitor.net/');
  await page.getByRole('textbox').fill('max+84732754828@nanitor.com');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect.soft(page.locator('form')).toContainText('Password');
  await page.getByRole('textbox').fill('Password123!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Global dashboard' })).toContainText('Global dashboard');
  await page.locator('org-navigator').getByRole('button').first().click();
  await page.getByText('Log out').click();
  await expect(page.getByRole('heading')).toContainText('Sign in');
});