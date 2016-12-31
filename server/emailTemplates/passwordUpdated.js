'use strict';


function buildTemplate(data) {
	return `
		<div style="max-width:800px;position:relative;margin:20px auto;padding:15px;border:2px solid black;box-shadow:0 0 5px 2px lightgray;letter-spacing:1px;">
			<div style="text-align:center;">
				<h1 style="font-size:40px; font-size:40px; padding-bottom:5px; margin-top:15px;  border-bottom:1px solid #cacaca;">Password Updated</h1>
				<h2 style="font-size:28px">...your password has been updated.</h2>
			</div>

			<h4 style="font-size="18px"></h4>

			<div style="text-align:center;">
				<b>The password for an account connected to this e-mail has recently been updated. If you were not aware of this change, please contact us immediately to
				resolve the issue.</b>
			</div>

			<div style="text-align:center; border-top:1px solid #cacaca; padding:20px 0 0 0; margin: 20px 0 0 0;">
				<img src="https://www.battle-comm.net/images/BC_Web_Logo.png">
			</div>
		</div>
	`
}

module.exports = buildTemplate;
