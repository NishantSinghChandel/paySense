import React from "react";
import Head from "next/head";
import { connect } from "react-redux";
import Home from "../components/home";
class Index extends React.Component {
	render() {
		return (
			<div>
				<Head>
					<title>My page title</title>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link
						rel="stylesheet"
						href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
					/>
				</Head>
				<Home />
			</div>
		);
	}
}

export default connect()(Index);
