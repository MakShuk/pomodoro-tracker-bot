import { Logger, ILogObj } from 'tslog';

export interface ILogger {
	error(...args: any[]): void;
	warn(...args: any[]): void;
	info(...args: any[]): void;
	trace(...args: any[]): void;
	test(): void;
}
