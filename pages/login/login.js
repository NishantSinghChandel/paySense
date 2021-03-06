import React, { Component } from "react";
import "./login.scss";
import { connect } from "react-redux";
import Link from "next/link";
import Router from "next/router";
class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: ""
		};
	}

	handleSubmitClick = e => {
		let json_str = this.getCookie("authorisedUser");
		let authorisedUser = JSON.parse(json_str);
		let validUser = authorisedUser.some(data => {
			return (
				data.username === this.state.username &&
				data.password === this.state.password
			);
		});
		if (validUser) {
			this.setCookie("username", this.state.username, 1);
		} else {
			alert("Either username or password doen't match");
		}
		e.preventDefault();
	};

	getCookie = cname => {
		let name = cname + "=";
		let ca;
		if (process.browser) {
			ca = document.cookie.split(";");
		}
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	};

	setCookie = (cname, cvalue, exdays) => {
		let d = new Date();
		d.setTime(d.getTime() + exdays * 60 * 1000);
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		Router.replace("/");
	};

	handleUserName = e => {
		this.setState({
			username: e.target.value
		});
	};
	handlePassword = e => {
		this.setState({
			password: e.target.value
		});
	};

	render() {
		return (
			<div className="page-login">
				<div>
					<div className="text-center mb-5">Login</div>
					<div className="mt-5">
						<form onSubmit={e => this.handleSubmitClick(e)}>
							<input
								type="email"
								value={this.state.username}
								onChange={e => this.handleUserName(e)}
								placeholder="Enter email"
								required
							/>
							<input
								type="password"
								value={this.state.password}
								onChange={e => this.handlePassword(e)}
								placeholder="Enter username"
								required
							/>
							<button type="submit" className="btn btn-primary mb-5">
								Submit
							</button>
						</form>
					</div>
					<div className="text-center m-5 text-dark">
						Not registered yet?{" "}
						<Link href="/signup">
							<a> Signup here </a>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { imageList } = state;
	return { imageList };
}

export default connect(mapStateToProps)(Login);
