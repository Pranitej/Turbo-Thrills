import React from "react";
import Navbar from "../Navbar";
import Carousel from "../Carousel";
import HomeMenu from "../HomeBody";
import Footer from "../Footer";

export default function Home() {
	return (
		<>
			<Navbar page="home" />
			<Carousel />
			<HomeMenu />
			<Footer />
		</>
	);
}
