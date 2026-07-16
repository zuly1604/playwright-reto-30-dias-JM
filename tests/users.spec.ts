import { expect, test } from "@playwright/test"
import { LoginPage } from "../pageobjects/LoginPage"


test('Get all registered employee Name', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row')
    const employeeNames: string[] = []
    const rowCount = await rows.count()

    for (let i = 1; i < rowCount; i++) {

        const cell = rows.nth(i).getByRole('cell').nth(3)
        const employeeName = await cell.textContent()

        if (employeeName) {
            employeeNames.push(employeeName)
        }
    }

    console.log(employeeNames)

})

/* test('Select specific user for edition', async ({ page }) => {

    const userForEdition = 'usersara001'

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page
        .getByRole('navigation', { name: 'Topbar menu' })
        .getByText('User Management')
        .click()

    await page.getByRole('menuitem', { name: 'Users' }).click()

    const pencilToEdit = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition })
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })

    await pencilToEdit.click()

    const usernameInput = page.locator(
        "//label[contains(., 'Username')]/parent::div/following-sibling::div/input"
    )

    // toHaveValue reintenta hasta que el campo cargue el valor esperado
    await expect(usernameInput).toHaveValue(userForEdition)

})*/

test('Select a random user for edition', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page
        .getByRole('navigation', { name: 'Topbar menu' })
        .getByText('User Management')
        .click()

    await page.getByRole('menuitem', { name: 'Users' }).click()

    // Leemos todos los usernames de la tabla (columna 1), ignorando 'Admin'
    const rows = page.getByRole('table').getByRole('row')

    // Esperamos a que la tabla cargue los datos antes de leerla
    await expect(rows.nth(1).getByRole('cell').nth(1)).not.toBeEmpty()

    const rowCount = await rows.count()
    const usernames: string[] = []

    for (let i = 1; i < rowCount; i++) {
        const username = (await rows.nth(i).getByRole('cell').nth(1).textContent())?.trim()

        if (username && username !== 'Admin') {
            usernames.push(username)
        }
    }

    console.log('Usernames disponibles', usernames)

    // Seleccionamos un usuario aleatorio de la lista
    const randomIndex = Math.floor(Math.random() * usernames.length)
    const userForEdition = usernames[randomIndex]

    console.log('Usuario seleccionado para edición', userForEdition)

    const pencilToEdit = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition })
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })

    await pencilToEdit.click()

    const usernameInput = page.locator(
        "//label[contains(., 'Username')]/parent::div/following-sibling::div/input"
    )

    // toHaveValue reintenta hasta que el campo cargue el valor esperado
    await expect(usernameInput).toHaveValue(userForEdition)

})