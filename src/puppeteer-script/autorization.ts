import { ConsoleService } from '../services/console/console.service';
import { LoggerService } from '../services/logger/logger.service';
import { PuppeteerService } from '../services/puppeteer/puppeteer.service';
import { Path } from '../enums/path';
import { Url } from '../enums/url';
import { Selector } from '../enums/selector';

export const autorization = async (): Promise<void> => {
	const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
	const logger = new LoggerService('login');
	const consoleInput = new ConsoleService('Введите пин');
	try {
		await pomodoPage.pageOpen();
		await pomodoPage.click(Selector.loginStatus);
		await pomodoPage.screenshot();
		await pomodoPage.click(Selector.openLoginMenuBtn);
		await pomodoPage.screenshot();
		await pomodoPage.setValue(Selector.inputEmail, 'makshuk@bk.ru');
		await pomodoPage.screenshot();
		await pomodoPage.click(Selector.notifyWindow);
		await pomodoPage.screenshot();
		await pomodoPage.delay(2000);
		await pomodoPage.click(Selector.sendPassBtn);
		await pomodoPage.screenshot();
		await pomodoPage.delay(2000);
		await pomodoPage.click(Selector.sendPassBtn);
		await pomodoPage.screenshot();
		await pomodoPage.delay(2000);
		await pomodoPage.click(Selector.sendPassBtn);
		await pomodoPage.screenshot();
		await pomodoPage.delay(2000);
		await pomodoPage.click(Selector.sendPassBtn);
		await pomodoPage.screenshot();
		await pomodoPage.delay(2000);
		await pomodoPage.click(Selector.sendPassBtn);
		await pomodoPage.screenshot();
		await pomodoPage.delay(2000);
		await pomodoPage.click(Selector.sendPassBtn);
		await pomodoPage.screenshot();
		await pomodoPage.delay(2000);
		await pomodoPage.setValue(Selector.inputPass, '221256047');
		await pomodoPage.delay(2000);
		await pomodoPage.screenshot();
		await pomodoPage.click(Selector.loginBtn);
		await pomodoPage.delay(3000);
		await pomodoPage.screenshot();

		// await pomodoPage.setValue(Selector.inputEmail, 'makshuk@bk.ru');
		// await pomodoPage.delay(3000);

		// const valueBtn = await pomodoPage.getTextContent(Selector.sendPassBtn);
		// logger.warn(valueBtn);

		// await pomodoPage.click(Selector.sendPassBtn);
		// await pomodoPage.delay(3000);

		// const valueBtn2 = await pomodoPage.getTextContent(Selector.sendPassBtn);
		// logger.warn(valueBtn2);

		// await pomodoPage.click(Selector.sendPassBtn);
		// await pomodoPage.delay(3000);

		// const valueBtn3 = await pomodoPage.getTextContent(Selector.sendPassBtn);
		// logger.warn(valueBtn3);
		// await pomodoPage.click(Selector.sendPassBtn);
		// await pomodoPage.delay(3000);
		// await pomodoPage.screenshot();

		// const pin = await consoleInput.readConsole();

		// await pomodoPage.setValue(Selector.inputPass, pin);
		// await pomodoPage.screenshot();
		/* 	await pomodoPage.delay(3000);
		await pomodoPage.click(Selector.loginBtn);
		await pomodoPage.delay(2000);
		await pomodoPage.screenshot(); */
	} catch (error) {
		logger.error(error);
	} finally {
		await pomodoPage.close();
	}
};
