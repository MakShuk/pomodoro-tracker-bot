import { Path } from '../enums/path';
import { createReadStream } from 'fs';
import { Url } from '../enums/url';
import { PomodoroService } from '../services/pomodro/pomodoroService';
import { PuppeteerService } from '../services/puppeteer/puppeteer.service';

export async function startPomodoro(ctx: any): Promise<void> {
	ctx.session?.messages ? (ctx.session.messages = []) : null;
	const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
	const pomodo = new PomodoroService(pomodoPage);
	const state = await pomodo.start();
	const message: string = state.running ? 'Pomodoro is already running' : 'Pomodoro started';
	await ctx.replyWithPhoto({ source: createReadStream('screenshot-1.jpg') });
	await ctx.reply(` 🍅 ${message} 
📝 TODO: ${state.task}  
⏰ Timer: ${state.time}`);
}
export async function stopPomodoro(ctx: any): Promise<void> {
	ctx.session?.messages ? (ctx.session.messages = []) : null;
	const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
	const pomodo = new PomodoroService(pomodoPage);
	await pomodo.stop();
	await ctx.replyWithPhoto({ source: createReadStream('screenshot-1.jpg') });
	await ctx.reply(`🍅Pomodoro stoped`);
}

export async function getScreenshot(ctx: any): Promise<void> {
	ctx.session?.messages ? (ctx.session.messages = []) : null;
	const pomodoPage = new PuppeteerService(Url.main, Path.cookie);
	const pomodo = new PomodoroService(pomodoPage);
	await pomodo.getScreenshot();
	await ctx.replyWithPhoto({ source: createReadStream('screenshot-1.jpg') });
}
