const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { describe } = require('node:test');
const chrome = require('selenium-webdriver/chrome');
require('dotenv').config();

var driver;

const on404Page = async () => {
    try {
        let pageHeading = await driver.findElement(By.id('404'));

        assert.equal(
            await pageHeading.getText(),
            '4😕4',
            'Did not end up on 404'
        );
    } catch (error) {
        assert.fail('Did not end up on 404');
    }
};

describe('Selenium tests', async () => {
    // eslint-disable-next-line no-undef
    before(async function () {
        let options = new chrome.Options();

        // Add argument to disable the AutomationControlled flag
        options.addArguments('--disable-blink-features=AutomationControlled');

        // Exclude the collection of enable-automation switches
        options.excludeSwitches(['enable-automation']);

        // Turn off userAutomationExtension
        options.addArguments('--disable-extensions');

        // Initialize the browser with the options
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });
    // eslint-disable-next-line no-undef
    after(async function () {
        //await driver.quit();
    });

    describe('All routes can load without user logged in', async () => {
        it('should load Home', async () => {
            await driver.get('http://localhost:3000');
            let heading = await driver.findElement(By.tagName('h1'));

            assert.equal(await heading.getText(), 'Welcome in Code Presenter');
        });

        it('should load 404', async () => {
            await driver.get('http://localhost:3000/404');
            await on404Page();
        });

        it("shouldn't load editor", async () => {
            await driver.get('http://localhost:3000/editor');

            await on404Page();
        });

        it("shouldn't load my codes", async () => {
            await driver.get('http://localhost:3000/my-codes/');

            await on404Page();
        });
    });

    describe('Auth works', async function () {
        // Note: This will only work if you allow access for given email ahead (Once, not everytime)
        it('should log in', async function () {
            this.timeout(10000);
            try {
                await driver.get('http://localhost:3000/');

                const loginButton = await driver.findElement(
                    By.id('login-button')
                );
                await loginButton.click();

                // Wait for the popup window to open
                var allWindows = await driver.getAllWindowHandles();
                while (allWindows.length < 2) {
                    allWindows = await driver.getAllWindowHandles();
                }

                await driver.switchTo().window(allWindows[1]);
                await driver.wait(until.titleContains('Sign in'), 10000);

                const emailInput = await driver.findElement(
                    By.id('identifierId')
                );
                await emailInput.sendKeys(process.env.REACT_APP_TEST_EMAIL);

                const nextButton = await driver.findElement(
                    By.xpath('//button/span[contains(text(), "Next")]')
                );
                await nextButton.click();

                const passwordField = await driver.wait(
                    until.elementLocated(By.name('Passwd')),
                    5000
                );

                await driver.wait(until.elementIsVisible(passwordField), 5000);
                await passwordField.sendKeys(
                    process.env.REACT_APP_TEST_PASSWORD
                );

                const passwordNextButton = await driver.findElement(
                    By.id('passwordNext')
                );
                await passwordNextButton.click();

                await driver.switchTo().window(allWindows[0]);

                await driver.wait(
                    until.elementLocated(By.className('menu')),
                    10000
                );
                await driver.findElements(By.className('menu'));

                assert.ok('Logged in successfully');
            } catch (e) {
                assert.fail('Did not log in');
            }
        });

        it('should log out', async function () {
            this.timeout(4000);
            try {
                const profileDropdown = await driver.wait(
                    until.elementLocated(By.id('profile-dropdown')),
                    5000
                );
                await driver.wait(
                    until.elementIsVisible(profileDropdown),
                    5000
                );

                // Click on the profile dropdown
                await profileDropdown.click();

                // Wait for the logout link to be clickable
                const logoutLink = await driver.wait(
                    until.elementLocated(By.id('logout-link')),
                    5000
                );
                await driver.wait(until.elementIsVisible(logoutLink), 5000);

                // Click on the logout link
                await logoutLink.click();

                // Optional: Assert that the user is redirected to the login page (or another page)
                await driver.wait(
                    until.elementLocated(By.id('login-button')),
                    5000
                );
                assert.ok('Logged out successfully');
            } catch (e) {
                assert.fail('Did not log out');
            }
        });
    });
});
