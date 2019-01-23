import React, { Component } from "react";
import "./signup.scss";
import Router from "next/router";
export default class signup extends Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			userName: "",
			password: "",
			confirmPassword: ""
		};
	}
	handleFirstNameChange = e => {
		this.setState({
			firstName: e.target.value
		});
	};
	handleLastNameChange = e => {
		this.setState({
			lastName: e.target.value
		});
	};
	handleUserNameChange = e => {
		this.setState({
			userName: e.target.value
		});
	};
	handlePasswordChange = e => {
		this.setState({
			password: e.target.value
		});
	};

	handleConfirmPasswordChange = e => {
		this.setState({
			confirmPassword: e.target.value
		});
	};
	handleSubmitClick = e => {
		if (
			this.state.password.trim().length > 0 &&
			this.state.password === this.state.confirmPassword
		) {
			let authorisedUser = [
				{ username: this.state.userName, password: this.state.password }
			];
			let json_str = JSON.stringify(authorisedUser);
			this.setCookie("authorisedUser", json_str, 365);
			alert("User created successfully");
			Router.replace("/login");
		} else if (this.state.userName.trim().length === 0) {
			alert("Email is required");
		} else {
			alert("Retype password doesn't match");
		}
		e.preventDefault();
	};

	setCookie = (cname, cvalue, exdays) => {
		let d = new Date();
		d.setTime(d.getTime() + exdays * 60 * 60 * 1000);
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		Router.replace("/");
	};
	render() {
		return (
			<div className="page-signup">
				<div className="form-container">
					<h4>Register</h4>
					<form onSubmit={e => this.handleSubmitClick(e)}>
						<input
							type="text"
							value={this.state.firstName}
							onChange={e => this.handleFirstNameChange(e)}
							placeholder="First Name"
							required
						/>
						<input
							type="text"
							value={this.state.lastName}
							onChange={e => this.handleLastNameChange(e)}
							placeholder="Last Name"
							required
						/>
						<input
							type="email"
							value={this.state.userName}
							onChange={e => this.handleUserNameChange(e)}
							placeholder="Email"
							required
						/>
						<input
							type="password"
							value={this.state.password}
							onChange={e => this.handlePasswordChange(e)}
							placeholder="Password"
							required
						/>
						<input
							type="password"
							value={this.state.confirmPassword}
							onChange={e => this.handleConfirmPasswordChange(e)}
							placeholder="Retype Password"
							required
						/>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}
