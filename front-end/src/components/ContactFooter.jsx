import React from "react";

export default function ContactFooter() {
	return (
		<div className="container mb-5">
			<div className="text-center text-light">
				<h4>Contact Us</h4>
        <div className="mt-3">
          <p><span className="text-danger fs-5">* </span>For Offline visits</p>
					<p>
						Monday - Friday
						<br />
						9am - 10pm
					</p>
					<p>
						Saturday - Sunday
						<br />
						10am - 9pm
					</p>
					<p>Contact : +91 98765 43210</p>
				</div>
			</div>
		</div>
	);
}
