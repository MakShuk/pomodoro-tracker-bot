import { Selector } from '../../enums/selector';
import { LoggerService } from '../logger/logger.service';
import { PuppeteerService } from '../puppeteer/puppeteer.service';

export class PomodoroService {
	logger = new LoggerService();
	constructor(private page: PuppeteerService) {}

	async start(): Promise<void> {
		await this.action(Selector.startBtn, ActionType.click);
	}

	async stop(): Promise<void> {
		await this.action(Selector.stopBtn, ActionType.click);
	}

	async getStatus(): Promise<string | null> {
		let status: string | null = await this.page.getTextContent(Selector.timer);
		while (status?.trim() === '00 : 00') {
			status = await this.page.getTextContent(Selector.timer);
			await this.page.delay(400);
			//	console.log(status);
		}
		return status;
	}

	async getTimer(): Promise<string | null> {
		return await this.action(Selector.timer, ActionType.getTextContent);
	}

	private async action(selector: Selector, type: ActionType): Promise<string | null> {
		let value: string | null;
		await this.page.pageOpen();
		await this.getStatus();
		switch (type) {
			case 0:
				await this.page.click(selector);
				value = null;
				break;
			case 1:
				value = await this.page.getTextContent(selector);
				break;
			default:
				this.logger.error('No such action');
				value = null;
		}
		await this.page.delay(300);
		await this.page.close();
		return value;
	}
}
