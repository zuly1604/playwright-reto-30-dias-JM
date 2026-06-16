import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/')
})

test('Login to hrm', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
  await page.getByRole('button', { name: 'Login' }).click()
  await expect(page).toHaveURL(/dashboard/)
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('Login to hrm invalid', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('Admi')
  await page.getByRole('textbox', { name: 'Password' }).fill('admin1')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByRole('alert')).toContainText('Invalid credentials')
})