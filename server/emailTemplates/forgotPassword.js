'use strict';


function buildTemplate(data) {
	return `
		<div style="max-width:800px;position:relative;margin:20px auto;padding:15px;border:2px solid black;box-shadow:0 0 5px 2px lightgray;letter-spacing:1px;">
			<div style="text-align:center;">
				<h1 style="font-size:40px; font-size:40px; padding-bottom:5px; margin-top:15px;  border-bottom:1px solid #cacaca;">Password Reset</h1>
				<h2 style="font-size:28px">...follow the link to reset your password.</h2>
			</div>

			<h4 style="font-size="18px"></h4>

			<div style="text-align:center;">
				<b>The link will expire within 24 hours.</b>
			</div>

			<div style="text-align:center;margin:20px 0;">
				<a style="padding: 6px 12px;font-size: 20px;line-height: 1.42857143;border-radius: 3px;background: #278ECA;color: white;text-decoration: none;" href="https://www.battle-comm.net/App/#/reset-password/${data.token}">Reset Password</a>
			</div>

			<div style="text-align:center; border-top:1px solid #cacaca; padding:20px 0 0;">
				<img src="https://www.battle-comm.net/images/BC_Web_Logo.png">
			</div>
		</div>
	`
}

module.exports = buildTemplate;
