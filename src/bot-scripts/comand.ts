import { code as telegrafCodeFormat } from 'telegraf/format';
import { Path } from '../enums/path';
import { PomodoroService } from '../services/pomodro/pomodoroService';
import { Url } from '../enums/url';
import { PuppeteerService } from '../services/puppeteer/puppeteer.service';
import { LoggerService } from '../services/logger/logger.service';
import { autorization } from '../puppeteer-script/autorization';

export const startCommand = async (ctx: any): Promise<void> => {
	ctx.session?.messages ? (ctx.session.messages = []) : null;
	const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
	const pomodo = new PomodoroService(pomodoPage);

	const login = await pomodo.isLogin();
	await ctx.reply(login ? 'You are logged in' : 'Login is required /login');
};

export const newContext = async (ctx: any): Promise<void> => {
	ctx.session?.messages ? (ctx.session.messages = []) : null;
	await ctx.reply(telegrafCodeFormat('Контекст сброшен'));
};

export const login = async (ctx: any): Promise<void> => {
	autorization();
};
