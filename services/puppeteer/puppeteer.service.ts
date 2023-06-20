import puppeteer, { Browser, Page } from 'puppeteer';
import { FileService } from '../file/file.service';
import { LoggerService } from '../logger/logger.service';
import { getRandomValues } from 'crypto';

export class PuppeteerService {
	private browser: Browser;
	private page: Page;
	private logger = new LoggerService('puppeteer');
	cookieFile: FileService;
	private screenshotCounter = 1;

	constructor(private startPageUrl: string, private cookieFilePath: string) {
		this.cookieFile = new FileService(cookieFilePath);
	}

	async pageOpen(): Promise<void> {
		this.browser = await puppeteer.launch({
			headless: 'new',
		});
		this.logger.info('browser init');
		this.page = await this.browser.newPage();
		this.logger.info('page init');
		(await this.cookieFile.isCreated()) ? await this.loadCookie() : null;
		await this.page.goto(this.startPageUrl);
		await this.page.waitForNavigation();
		this.logger.info('Navigated to startPageUrl');
	}

	async goTo(url: string): Promise<void> {
		await this.page.goto(url);
		await this.screenshot();
	}

	async screenshot(): Promise<void> {
		const screenshot = await this.page.screenshot();
		const screenshotFile = new FileService(`screenshot-${this.screenshotCounter}.jpg`);
		screenshotFile.writeFile(screenshot);
		this.screenshotCounter++;
	}

	async close(): Promise<void> {
		await this.saveCookie();
		await this.browser.close();
	}

	async click(selectorForClick: string): Promise<void> {
		await this.page.click(selectorForClick);
		this.logger.info(`Клик по элементу ${selectorForClick}`);
	}

	async getTextContent(selector: string): Promise<string | null> {
		return await this.page.$eval(selector, (element) => element.textContent);
	}

	async delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async setValue(selector: string, value: string): Promise<void> {
		await this.page.type(selector, value);
	}

	private async saveCookie(): Promise<void> {
		const cookies = await this.page.cookies();
		const cookieJson = JSON.stringify(cookies, null, 2);
		await this.cookieFile.writeJsonFile(cookieJson);
	}

	private async loadCookie(): Promise<void> {
		const cookieJson = await this.cookieFile.readJsonFile();
		const cookies = JSON.parse(cookieJson);
		if (cookies) await this.page.setCookie(...cookies);
		this.logger.info('cookies loaded');
	}
}
