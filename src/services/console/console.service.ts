import readline from 'readline';

export class ConsoleService {
	consoleInterface: readline.Interface;
	constructor(private message: string) {
		this.message = message;
		this.init();
	}

	init(): void {
		this.consoleInterface = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
	}
	async readConsole(): Promise<string> {
		const answer = await new Promise<string>((resolve) => {
			this.consoleInterface.question(`${this.message}: `, (answer: string) => {
				resolve(answer);
			});
		});
		this.consoleInterface.close();
		return answer;
	}
}
