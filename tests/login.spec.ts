import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

test('Login to hrm', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.doLogin('Admin', 'admin123')
  await expect(page).toHaveURL(/dashboard/)
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('Login to hrm invalid', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.doLogin('Admi', 'admin1')

  await expect(page.getByRole('alert')).toContainText('Invalid credentials')
})