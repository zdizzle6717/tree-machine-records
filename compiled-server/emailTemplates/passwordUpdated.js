'use strict';

function buildTemplate(data) {
	return '\n\t\t<div style="max-width:800px;position:relative;margin:20px auto;padding:15px;border:2px solid black;box-shadow:0 0 5px 2px lightgray;letter-spacing:1px;">\n\t\t\t<div style="text-align:center;">\n\t\t\t\t<h1 style="font-size:40px; font-size:40px; padding-bottom:5px; margin-top:15px;  border-bottom:1px solid #cacaca;">Password Updated</h1>\n\t\t\t\t<h2 style="font-size:28px">...your password has been updated.</h2>\n\t\t\t</div>\n\n\t\t\t<h4 style="font-size="18px"></h4>\n\n\t\t\t<div style="text-align:center;">\n\t\t\t\t<b>The password for an account connected to this e-mail has recently been updated. If you were not aware of this change, please contact us immediately to\n\t\t\t\tresolve the issue.</b>\n\t\t\t</div>\n\n\t\t\t<div style="text-align:center; border-top:1px solid #cacaca; padding:20px 0 0 0; margin: 20px 0 0 0;">\n\t\t\t\t<img src="https://www.battle-comm.net/images/BC_Web_Logo.png">\n\t\t\t</div>\n\t\t</div>\n\t';
}

module.exports = buildTemplate;