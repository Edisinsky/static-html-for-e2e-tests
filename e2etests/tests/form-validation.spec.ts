const { test, expect } = require('@playwright/test');

test.describe("Create Account Form Validation", () => {

    const url = "http://localhost:8181";

    test.beforeEach(async ({ page }) => {
        page.goto(url);
    });

    test("should successfully register with valid data", async ({ page }) => {
        //ARRANGE
        await page.getByLabel("Full Name").fill("Jane Doe");
        await page.getByLabel("Email").fill("jane.doe@example.com");
        await page.getByLabel("Account Type").selectOption("developer");
        await page.getByLabel("Password").fill("mySecureP@ssw0rd");
        await page.getByLabel("I agree to the Terms and Conditions").check();

        //ACT
        await page.getByRole("button", { name: "Create Account"}).click();

        //ASSERT
        const successfullMesssage = page.locator("#success-message");
        await expect(successfullMesssage).toBeVisible();
        await expect(
            page.getByRole("heading", { name: "Registration Successful!" }),
        ).toBeVisible();

        await expect(page.locator("#registrationForm")).toBeHidden();

    });
    
    test("should show error for invalid email format", async ({ page }) => { 
        //ARRANGE
        await page.getByLabel("Full Name").fill("Jane Doe");
        await page.getByLabel("Email").fill("invalid-email-format");
        //ACT
        await page.getByRole("button", { name: "Create Account" }).click();
        //ASSERT
        await expect(page.locator("#emailError")).toBeVisible();
    });

});