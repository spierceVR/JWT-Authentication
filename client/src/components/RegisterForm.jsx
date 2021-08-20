import React, { Fragment } from "react";
import AuthForm from "./AuthForm";

const RegisterForm = (props) => {
    return (
        <Fragment>
            <h1>Register</h1>
            <AuthForm setReg={props.setReg} name="Register" endpoint="http://localhost:5000/auth/register"/>
            <a href="/login" className="btn btn-primary mt-3"> Already have an account? Log in instead</a>
        </Fragment>
    )
}

export default RegisterForm;