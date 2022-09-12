
# Captcha Minigame

* Update captcha dialog icon.
* Keep a running log of current "session"
	* Score is based on current Run
		* add captchaSessionIdx
		* Use that as the multiplier.
	* SVG Filter is based on current Run. Each run should start Easy, but get progressively harder as the player continues solving captchas.
		* use the captchaSessionIdx for the filter 