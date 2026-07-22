import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
import { SideMenuOption, SidePanel } from '../components/SidePanel'

test('Login to hrm', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.doLogin('Admin', 'admin123')
  //await expect(page).toHaveURL(/dashboard/)
  //await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

  const sidePanel = new SidePanel(page)

  await expect(sidePanel.listOptions(SideMenuOption.ADMIN)).toBeVisible()
  await sidePanel.clickOnOption(SideMenuOption.ADMIN)
  await sidePanel.clickOnOption(SideMenuOption.BUZZ)
  await sidePanel.clickOnOption(SideMenuOption.DASHBOARD)
  await sidePanel.searchAnOption(SideMenuOption.ADMIN)
  await sidePanel.searchAnOption(SideMenuOption.LEAVE)

})

test('Login to hrm invalid', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.doLogin('Admi', 'admin1')

  await expect(page.getByRole('alert')).toContainText('Invalid credentials')
})