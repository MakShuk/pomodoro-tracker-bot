import { ConsoleService } from '../services/console/console.service';
import { LoggerService } from '../services/logger/logger.service';
import { PuppeteerService } from '../services/puppeteer/puppeteer.service';
import { Path } from '../enums/path';
import { Url } from '../enums/url';
import { Selector } from '../enums/selector';

const autorization = async (): Promise<void> => {
	const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
	const logger = new LoggerService('main');
	const consoleInput = new ConsoleService('Введите пин');
	try {
		await pomodoPage.pageOpen();
		await pomodoPage.delay(500);

		await pomodoPage.click('#navbar-collapse > web-menu > div');
		await pomodoPage.delay(2000);
		await pomodoPage.click(Selector.openLoginMenuBtn);

		await pomodoPage.setValue(Selector.inputEmail, 'makshuk@my.com');
		await pomodoPage.click(Selector.sendPassBtn);
		await pomodoPage.delay(2000);
		await pomodoPage.screenshot();

		const pin = await consoleInput.readConsole();

		await pomodoPage.setValue(Selector.inputPass, pin);
		await pomodoPage.screenshot();
		await pomodoPage.click(Selector.loginBtn);
		await pomodoPage.delay(2000);
		await pomodoPage.screenshot();
	} catch (error) {
		logger.error(error);
	} finally {
		await pomodoPage.close();
	}
};
