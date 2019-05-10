const setLoader = state => {
	if (state) {
		document
			.getElementsByClassName('content__button')[0]
			.classList.add('running');
	} else {
		document
			.getElementsByClassName('content__button')[0]
			.classList.remove('running');
	}
};

const setError = message => {
	if (message) {
		document.getElementById('error_message').innerText = message;
		document.getElementById('error_message').hidden = false;
		setSuccess();
	} else {
		document.getElementById('error_message').hidden = true;
	}
};

const setSuccess = message => {
	if (message) {
		document.getElementById('success_message').innerText = message;
		document.getElementById('success_message').hidden = false;
		setError();
	} else {
		document.getElementById('success_message').hidden = true;
	}
};

const setButtonText = text => {
	if (text) {
		document.getElementById('button_text').innerText = text;
		document.getElementById('generate_report').classList.add('disabled');
	} else {
		document.getElementById('button_text').innerText = 'Generate Report';
		document.getElementById('generate_report').classList.remove('disabled');
	}
};

const generateReport = () => {
	if (
		document.getElementById('generate_report').classList.contains('disabled') ||
		document.getElementById('generate_report').classList.contains('successful')
	) {
		return;
	}
	setLoader(true);
	setButtonText('Verifying Start Conditions');
	setSuccess();
	setError();
	browser.tabs.query({ currentWindow: true }, tabs => {
		const currentTab = tabs.filter(tab => tab.active)[0];
		if (
			/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
				currentTab.url
			)
		) {
			setTimeout(() => {
				setButtonText('Generating Report');
			}, 1000);
			let request = {
				url: currentTab.url,
				replace: true,
				save: true,
			};
			fetch('https://lighthouse-dot-webdotdevsite.appspot.com/lh/newaudit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': 64,
				},
				body: JSON.stringify(request),
			})
				.then(response => {
					if (response.status === 201) {
						setSuccess('Successfully ran Lighthouse. Opening Report...');
						setButtonText('Opening Report');
						setTimeout(() => {
							setButtonText('Report Generated');
							setLoader(false);
							document
								.getElementById('generate_report')
								.classList.add('successful');
							browser.tabs.create(
								{
									active: true,
									url: `https://lighthouse-dot-webdotdevsite.appspot.com/lh/html?url=${
										currentTab.url
									}`,
								},
								() => {
									setTimeout(() => {
										window.close();
									}, 3000);
								}
							);
						}, 500);
					} else {
						return response.json();
					}
				})
				.then(res => {
					if (res) {
						console.log(res);
						setLoader(false);
						setButtonText();
						setError('There was an error in getting data from Google...');
					}
				})
				.catch(e => {
					console.log(e);
					setLoader(false);
					setButtonText();
					setError('There was an error in getting data from Google');
				});
		} else {
			setTimeout(() => {
				setLoader(false);
				setButtonText();
				setError(`That's not a valid URL to run Lighthouse on`);
			}, 1000);
		}
	});
};

document
	.getElementById('generate_report')
	.addEventListener('click', generateReport);
