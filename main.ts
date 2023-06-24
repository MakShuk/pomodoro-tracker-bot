import { Telegraf } from 'telegraf';
import { PuppeteerService } from './src/services/puppeteer/puppeteer.service';
import { Url } from './src/enums/url';
import { Path } from './src/enums/path';

const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
//const pomodo = new PomodoroService(pomodoPage);
//const bot = new Telegraf()

async function start(): Promise<void> {
	console.log('Hi');
}
// Загрузка ожидания не нулей
// Ожидание загрузки спсика
start();
