import { PuppeteerService } from './services/puppeteer/puppeteer.service';
import { Path } from './enums/path';
import { Url } from './enums/url';
import { Selector } from './enums/selector';

class PomodoroService {
	constructor(private page: PuppeteerService) {}

	async start(): Promise<void> {
		await this.action(Selector.startBtn);
		//this.page.screenshot();
	}

	async stop(): Promise<void> {
		await this.action(Selector.stopBtn);
		//this.page.screenshot();
	}

	async getStatus(): Promise<string | null> {
		await this.page.pageOpen();
		const status = await this.page.getTextContent(Selector.statusLoadind);
		await this.page.close();
		return status;
	}
	private async action(selector: Selector): Promise<void> {
		await this.page.pageOpen();
		await this.page.delay(1500);
		await this.page.click(selector);
		await this.page.delay(500);
		await this.page.close();
	}
}

const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
const pomodo = new PomodoroService(pomodoPage);

const start = async (): Promise<void> => {
	const status = await pomodo.getStatus();
	console.log(status);
};
// Загрузка ожидания не нулей
// Ожидание загрузки спсика
start();
