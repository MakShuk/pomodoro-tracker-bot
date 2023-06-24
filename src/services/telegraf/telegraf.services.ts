import { Telegraf, session } from 'telegraf';
import { message } from 'telegraf/filters';
import { LoggerService } from '../logger/logger.service';

export class TelegrafServices {
	logger = new LoggerService();
	bot: Telegraf;
	constructor(private token: string) {
		this.token = token;
		this.init();
	}

	async init(): Promise<void> {
		this.bot = new Telegraf(this.token);
		this.logger.info('Bot is running');
		await this.bot.launch();
	}

	async comand(handlerFunc: (ctx: any) => void, comand: string): Promise<void> {
		this.bot.command(comand, async (context) => {
			try {
				await handlerFunc(context);
			} catch (e: any) {
				this.logger.error(`Comand /${comand} Error while message: ${e}`);
			}
		});
	}
	async speechToAction(handlerFunc: (ctx: any) => void): Promise<void> {
		this.bot.on(message('voice'), async (context) => {
			try {
				await handlerFunc(context);
			} catch (e: any) {
				this.logger.error(`Error while speechToAction message ${e}`);
			}
		});
	}

	async textToAction(handlerFunc: (ctx: any) => void): Promise<void> {
		this.bot.on(message('text'), async (context) => {
			try {
				await handlerFunc(context);
			} catch (e: any) {
				this.logger.error(`Error while textToAction message ${e}`);
			}
		});
	}

	async fileToAction(handlerFunc: (ctx: any) => void): Promise<void> {
		this.bot.on('document', async (context) => {
			try {
				await handlerFunc(context);
			} catch (e: any) {
				this.logger.error(`Error while textToAction message ${e}`);
			}
		});
	}

	useSession(): void {
		this.bot.use(session());
	}
}
