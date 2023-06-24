import { Path } from '../enums/path';
import { Url } from '../enums/url';
import { PomodoroService } from '../services/pomodro/pomodoroService';
import { PuppeteerService } from '../services/puppeteer/puppeteer.service';

async function statrPomodoro(): Promise<void> {
	const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
	const pomodo = new PomodoroService(pomodoPage);
	pomodo.start();
}
