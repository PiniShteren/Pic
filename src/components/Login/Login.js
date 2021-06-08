import React, { useState } from "react";
import Cookie from 'js-cookie';
import { TextField } from "@material-ui/core";
import axios from "axios";
import user from '../../images/icons/profile-user.svg';

export default function Login(props) {
	const [flag, setFlag] = useState(true);
	const [errorlogin, setErrorlogin] = useState('');
	const [errorsignup, setErrorsignup] = useState('');
	const [username, setUsername] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const emailSignupHandler = ({target}) => {
            let emailValue = target.value;
		if(emailValue.match('[a-z0-9A-Z._%+-]{4,}@[a-z0-9-.]{3,}([.]net.il|[.]co.il|[.]net|[.]com)')) {
		setEmail(emailValue);
		}
		else{
			setEmail('');
		}
	}
	const emailLoginHandler = ({target}) => {
            setEmail(target.value);
	}
	const nameHandler = ({target}) => {
		
             if(target.value.match('[a-zA-Z]{2,}[0-9a-zA-Z]')){
			 setUsername(target.value);
		 }else{
			 setUsername('');
		 }
	}
	const passwordLoginHandler = ({target}) => {
            setPassword(target.value);
	}
	const passwordSignupHandler = ({target}) => {
            if(target.value.length >= 8 ) {
			setPassword(target.value);
			
		}else{
			setPassword('');
		}
	}
	const signupClick = () => {
		if(username && email && password) {
			axios.post('https://node-exmple-ps.herokuapp.com/api/user/insert', {
				username,
				email,
				password
			}).then((res)=>{
				if(res.data === "User added") {
					props.login(true);
					Cookie.set('flag', true, {expires: 30, path:'/'});
				}else{
					setErrorsignup('Email already exists!!')
				}
			});
		}else{
			setErrorsignup('Fill the inputs')
		}
	}
	const loginClick = () => {
		if(email && password) {
			debugger
			axios.post('https://node-exmple-ps.herokuapp.com/api/user/check', {
				email,
				password
			}).then((res)=> {
				if(res.data === "User exists") {
					props.login(true);
					Cookie.set('flag', true, {expires: 30, path:'/'});
				}else{
					setErrorlogin('Email or Password Wrong!!')
				}
			})
		}
	}


	if (flag) {
		return (
			<div className="Login">
			<div className="login-div login">
                        <h1>Login</h1>
				<img src={user} alt="user" width="50vh" />
				<form>
					<TextField id="textfield" type="text" onChange={emailLoginHandler} label="email" />
					<TextField id="textfield" type="password" onChange={passwordLoginHandler} label="password" />
					<p id="error-login">{errorlogin}</p>
					<button id="button-login-signup" onClick={loginClick}>Login</button>
				</form>
				<p>
					If you do not have an account yet
					<button
						id="login-route"
						onClick={() => {
							setFlag(false);
						}}
					>
						sign up
					</button>
				</p>
			</div>
			</div>
		);
	} else {
		return (
			<div className="Login">
			<div className="signup-div login">
                        <h1>Sign Up</h1>
				<img src={user} alt="user" width="50vh" />
				<form>
					<TextField id="textfield" type="text" onChange={nameHandler} label="username" />
					<TextField id="textfield" type="text" label="email" onChange={emailSignupHandler} />
					<TextField id="textfield" type="password" onChange={passwordSignupHandler} label="password" />
					<p id="error-login">{errorsignup}</p>
					<button id="button-login-signup" onClick={signupClick}>Sign Up</button>
				</form>
				<p>
					If you have an account yet
					<button
						id="login-route"
						onClick={() => {
							setFlag(true);
						}}
					>
						login
					</button>
				</p>
			</div>
			</div>
		);
	}
}
