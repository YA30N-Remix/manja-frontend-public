import { browserType, launchConfig, contextConfig } from '../playwright.config'

const rootSelector = '#root';
let browser, context, page;

export const root = async () => await page.$(rootSelector);

export const load = async () => {
    browser = await browserType.launch(launchConfig);
    context = await browser.newContext(contextConfig);
    page = await context.newPage();
    await page.goto(baseURL);
    await page.click('data-test-id=toggle-language-selector-modal');
    await page.click('text=فارسی');    
};

export const getCloseLanguageSelectorModalButtomclassName = async () => {
  const app = await root();
  return await app.$eval('data-test-id=close-language-selector-modal', el => el.className);
}

export const close = async () => await browser.close();

