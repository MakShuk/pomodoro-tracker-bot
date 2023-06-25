import config from 'config';
import { PuppeteerService } from './services/puppeteer/puppeteer.service';
import { Url } from './enums/url';
import { Path } from './enums/path';
import { newContext, startCommand } from './bot-scripts/comand';
import { TelegrafServices } from './services/telegraf/telegraf.services';
import { getScreenshot, startPomodoro, stopPomodoro } from './bot-scripts/pomodoro-comands';

//const pomodo = new PomodoroService(pomodoPage);
//const bot = new Telegraf()

async function start(): Promise<void> {
	const bot = new TelegrafServices(config.get('TELEGRAM_TOKEN'));
	bot.comand(startCommand, 'start');
	bot.comand(startPomodoro, 'startPomodoro');
	bot.comand(stopPomodoro, 'stopPomodoro');
	bot.comand(getScreenshot, 'screen');
}
// Загрузка ожидания не нулей
// Ожидание загрузки спсика
start();
