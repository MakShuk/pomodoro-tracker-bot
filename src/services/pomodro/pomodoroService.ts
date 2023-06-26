import { Selector } from '../../enums/selector';
import { LoggerService } from '../logger/logger.service';
import { PuppeteerService } from '../puppeteer/puppeteer.service';

interface IPomodoro {
	running: boolean;
	task: string;
	time: string;
}

export class PomodoroService {
	logger = new LoggerService();
	constructor(private page: PuppeteerService) {}

	async start(): Promise<IPomodoro> {
		await this.init();
		const statusPomodo = await this.page.getTextContent(Selector.startBtn);
		const statusBreac = await this.page.getTextContent(Selector.breac);
		this.logger.warn(statusPomodo, statusBreac);
		const time = await this.page.getTextContent(Selector.timer);
		const running = statusPomodo?.trim() === 'PAUSE' ? true : false;
		const breac =
			statusBreac?.trim() === 'TAKE A SHORT BREAK' || statusBreac?.trim() === 'TAKE A LONG BREAK'
				? true
				: false;
		this.logger.warn('Breac status: ', breac);
		this.logger.warn('RUN status: ', running);
		let task = 'Breac';
		if (!running && !breac) {
			await this.page.click(Selector.startBtn);
			task = (await this.page.getTextContent(Selector.currentTask)) || 'Not TODO';
		}
		await this.page.screenshot();
		await this.close();
		return {
			running: running,
			task: task,
			time: time?.trim() || '00:00',
		};
	}

	async stop(): Promise<void> {
		await this.init();
		await this.page.click(Selector.stopBtn);
		await this.close();
	}

	async getTimer(): Promise<string | null> {
		await this.init();
		const content = await this.page.getTextContent(Selector.timer);
		await this.close();
		return content;
	}

	private async init(): Promise<void> {
		await this.page.pageOpen();
		await this.getStatus();
	}

	private async close(): Promise<void> {
		await this.page.delay(300);
		await this.page.close();
	}

	private async getStatus(): Promise<string | null> {
		let status: string | null = await this.page.getTextContent(Selector.timer);
		while (status?.trim() === '00 : 00') {
			status = await this.page.getTextContent(Selector.timer);
			await this.page.delay(400);
		}
		return status;
	}

	async getScreenshot(): Promise<void> {
		await this.init();
		await this.page.screenshot();
		await this.close();
	}

	async isLogin(): Promise<boolean> {
		await this.init();
		const login = await this.page.getTextContent(Selector.loginStatus);
		console.log(login?.trim() === 'Sign Up / Login');
		return login?.trim() === 'Sign Up / Login' ? false : true;
	}
}
