import React from "react";
import Navbar from "../Navbar";
import SignupBody from "../SignupBody";

export default function SignupPage() {
	return (
		<>
			<Navbar page="signup" />
			<SignupBody />
		</>
	);
}
