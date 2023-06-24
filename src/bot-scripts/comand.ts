import { code as telegrafCodeFormat } from 'telegraf/format';

export const startCommand = async (ctx: any): Promise<void> => {
	ctx.session?.messages ? (ctx.session.messages = []) : null;

	await ctx.reply(`🌸 Добро пожаловать!`);
};

export const newContext = async (ctx: any): Promise<void> => {
	ctx.session?.messages ? (ctx.session.messages = []) : null;
	await ctx.reply(telegrafCodeFormat('Контекст сброшен'));
};
