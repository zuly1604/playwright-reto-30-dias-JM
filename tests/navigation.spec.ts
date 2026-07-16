import { test, expect } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

test('Check left menu options', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(
        page.getByRole('link', { name: 'Admin' })
    ).toBeVisible()

    const leftMenuItems = page
        .getByLabel('Sidepanel')
        .getByRole('listitem')

    const currentMenuItemsCount = await leftMenuItems.count()

    console.log(
        'Current menu items count',
        currentMenuItemsCount
    )

    const currentMenuItems: string[] = []

    for (let i = 0; i < currentMenuItemsCount; i++) {

        const menuText = await leftMenuItems.nth(i).innerText()
        currentMenuItems.push(menuText)
    }

    console.log(currentMenuItems)

    const expectedMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];

    expect(currentMenuItems).toEqual(expectedMenuItems)
    // Nota: usé currentMenuItems[0] porque ya tenemos el array construido.
    expect(currentMenuItems[0]).toBe('Admin')

})

test('Navigate through the left panel', async ({ page }) => {

    test.setTimeout(90000)

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()

    for (let i = 0; i < currentMenuItemsCount; i++) {
        const menuItem = leftMenuItems.nth(i)
        const menuText = await menuItem.innerText()

        console.log('Current menu item', menuText)

        await menuItem.click()

        // Al hacer clic en Maintenance nos devolvemos a la página anterior
        if (menuText === 'Maintenance') {
            await page.goBack()
        }
    }
})

test('Check all the qualification links', async({page}) => {

    const expectedPages = [
        {
            menu: 'Skills',
            url: '/web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education', 
            url: '/web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses', 
            url: '/web/index.php/admin/viewLicenses'
        },
        
    ]

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

    const qualificationOptions = page.getByRole('menu').locator('li')

    for(let expectedPage of expectedPages){

        const menuOption = qualificationOptions.filter({hasText: expectedPage.menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualifications').click()

    } 
})

test('Check all the organization links', async({page}) => {

    const expectedPages = [
        {
            menu: 'General Information',
            url: 'web/index.php/admin/viewOrganizationGeneralInformation'
        },
        {
            menu: 'Locations', 
            url: 'web/index.php/admin/viewLocations'
        },
        {
            menu: 'Structure', 
            url: 'web/index.php/admin/viewCompanyStructure'
        },
        
    ]

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Organization').click()

    const organizationOptions = page.getByRole('menu').locator('li')

    for(let expectedPage of expectedPages){

        const menuOption = organizationOptions.filter({hasText: expectedPage.menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Organization').click()

    } 
})