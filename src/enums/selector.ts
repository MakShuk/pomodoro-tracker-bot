export enum Selector {
	openLoginMenuBtn = '#navbar-collapse > web-menu > popper > div.c-menu.c-menu--popup > web-login > div > div:nth-child(9)',
	inputEmail = '#navbar-collapse > web-menu > popper > div.c-menu.c-menu--popup > web-login > div > div.c-login_email > input',
	inputPass = '#navbar-collapse > web-menu > popper > div.c-menu.c-menu--popup > web-login > div > div.c-login_email > div.c-login_box.u-mt2 > input',
	sendPassBtn = '#navbar-collapse > web-menu > popper > div.c-menu.c-menu--popup > web-login > div > div.c-login_email > div > button.c-btn.c-btn--green.u-size-s',
	loginBtn = '#navbar-collapse > web-menu > popper > div.c-menu.c-menu--popup > web-logi.n > div > div.c-login_email > div.u-mt2.u-flex.u-flex--start > button.c-btn.c-btn--green.u-size-s',
	startBtn = 'body > div > main > div > pomodoro-timer > div > div.c-timer_buttons > button:nth-child(1)',
	stopBtn = 'body > div > main > div > pomodoro-timer > div > div.c-timer_buttons > button:nth-child(2)',
	statusLoadind = '.u-mv2',
	timer = '.c-timer_time',
	currentTask = 'body > div > main > div > pomodoro-timer > div > div.c-timer_description > todo-current > markdown',
	breac = 'body > div > main > div > pomodoro-timer > div > div.c-timer_head > div.c-head.u-right.u-noselect.u-nodrag',
}
