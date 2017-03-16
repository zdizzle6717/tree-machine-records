'use strict';


function buildTemplate(data) {
	return `
		<div style="max-width:800px;position:relative;margin:20px auto;padding:15px;background:aliceblue;box-shadow:0 0 15px 0 rgba(0,0,0,0.2), 0 5px 5px 0 rgba(0,0,0,0.24);letter-spacing:1px;">
			<div style="text-align:center;">
				<h1 style="font-size:40px; font-size:40px; padding-bottom:5px; margin-top:15px;  border-bottom:1px solid #cacaca;">New Account Requested, Registration Pending</h1>
				<h2 style="font-size:28px">...your new account has been submitted and is pending approval from the site admin.  If you applied as an artist or record label, we must first verify that your e-mail is associated with one of the respective access levels.</h2>
			</div>

			<p style="font-size:14px; line-height: 20px;">Thank you for collaborating with Tree Machine Records,</p>

			<h4 style="font-size:17px">Artist Account</h4>
			<h4 style="font-size:15px">As an artist, you will have access to update information and media associated with your artist page including photos and digital audio downloads.</h4>

			<h4 style="font-size:17px">Record Label Account</h4>
			<h4 style="font-size:15px">As a record label, you can login to update your profile and add merch to our distribution center.  A label associate will contact you in the next few days to discuss a basic agreement for listing your vinyl, cassettes, CD's, etc. in the distribution center.  We make it easier for record stores (across the U.S.) to find new releases and purchase records for retail.</h4>

			<p style="font-size:14px; line-height: 20px;">Records last a lifetime, and it's their physicality that helps strengthen memories of good times and moments passed. We're continuing
			to build out the website and helping to bring you closer to the artists that you love. If you have any recommendations or think we could do something better to improve the experience, don't hesitate to get in touch through e-mail or social media.</p>

			<div style="text-align:center; border-top:1px solid #cacaca; padding:20px 0 0;">
				<img src="http://www.treemachinerecords.com/images/treemachinerecords-email.png">
			</div>
			<h3>About the Label</h3>
			<p style="font-size:14px; line-height: 20px;">We believe the future is guided only by the past, and the present is decided only by our choices here and now. As technology advances, so much continues to change culturally and in many of the same ways across the globe. Tree Machine Records is our way of giving you a portal to peer into the past, and listen to the sounds that shape our future. Artists have connected with us and vice versa from various parts of the diverse, aural landscapes of the world that bring us together at the deepest level. It's our honor to create records of these mucisians' will to find meaning, in the beauty of life, throughout any given time.</p>
		</div>
	`
}

module.exports = buildTemplate;
