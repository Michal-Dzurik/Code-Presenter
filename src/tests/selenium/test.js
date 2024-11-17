const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const { describe } = require('node:test');
const console = require('node:console');

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
        const chromeOptions = new chrome.Options();
        chromeOptions.setPageLoadStrategy('eager');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();
    });
    // eslint-disable-next-line no-undef
    after(async function () {
        await driver.quit();
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
});
