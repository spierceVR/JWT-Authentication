import React, { Fragment } from "react";
import AuthForm from "./AuthForm";

const LoginForm = (props) => {
    return (
        <Fragment>
            <h1>Login</h1>
            <AuthForm setAuth={props.setAuth} name="Login" endpoint="http://localhost:5000/auth/login"/>
            <a href="/register" className="btn btn-primary mt-3"> Dont have an account? Register instead</a>
        </Fragment>
    )
}

export default LoginForm;