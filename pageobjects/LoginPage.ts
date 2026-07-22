import { Locator, Page } from "@playwright/test";
import { Environment } from "../config/Environment";

export class LoginPage {

    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page
        this.usernameInput = page.locator('input[name="username"]')
        this.passwordInput = page.locator('input[name="password"]')
        this.loginButton = page.locator('button[type="submit"]')
    }

    async doLogin(username: string, password: string) {
        await this.page.goto('/web/index.php/auth/login')
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }

    async loginAsAdmin(){
        await this.doLogin(Environment.ADMIN_USERNAME, Environment.ADMIN_PASSWORD)
    }

    async loginAsEss(){
        await this.doLogin(Environment.ESS_USERNAME, Environment.ESS_PASSWORD)
    }
}