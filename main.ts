import config from 'config';
import { PuppeteerService } from './src/services/puppeteer/puppeteer.service';
import { Url } from './src/enums/url';
import { Path } from './src/enums/path';
import { newContext, startCommand } from './src/bot-scripts/comand';
import { TelegrafServices } from './src/services/telegraf/telegraf.services';

//const pomodo = new PomodoroService(pomodoPage);
//const bot = new Telegraf()

async function start(): Promise<void> {
	const bot = new TelegrafServices(config.get('TELEGRAM_TOKEN'));
	bot.comand(startCommand, 'start');
}
// Загрузка ожидания не нулей
// Ожидание загрузки спсика
start();
