import { test, expect } from '@playwright/test';

test.describe("Create Account Form Validation", () => {
    const url = "http://localhost:8181";

    test.beforeEach(async ({ page }) => {
        await page.goto(url);
    });

    test("should open create account form", async ({ page }) => {
        await page.click('text=Create Account');
        // Verificamos que sea visible algún elemento del form, por ejemplo el botón
        await expect(page.getByRole("button", { name: "Create Account" })).toBeVisible();
    });

    test("should successfully register with valid data", async ({ page }) => {
        // ARRANGE
        await page.click('text=Create Account');
        await page.getByLabel("Full Name").fill("Eddy Castro"); // Usamos tu nombre
        await page.getByLabel("Email").fill("eddy.castro@example.com");
        await page.getByLabel("Account Type").selectOption("developer");
        await page.getByLabel("Password").fill("PasswordSeguro123");
        await page.getByLabel("I agree to the Terms and Conditions").check();
        
        // ACT
        await page.getByRole("button", { name: "Create Account" }).click();
        
        // ASSERT
        const successMessage = page.locator("#success-message");
        await expect(successMessage).toBeVisible();
        await expect(page.getByRole("heading", { name: "Registration Successful" })).toBeVisible();
        await expect(page.locator("#registationForm")).toBeHidden();
    });

    test("should show error for invalid email", async ({ page }) => {
        // ARRANGE
        await page.click('text=Create Account');
        await page.getByLabel("Full Name").fill("Eddy Castro");
        await page.getByLabel("Email").fill("correo-invalido"); // Formato incorrecto
        
        // ACT
        await page.getByRole("button", { name: "Create Account" }).click();
        
        // ASSERT
        await expect(page.locator("#email-error")).toBeVisible();
    });
});