import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

// My FOURTH React component :) - Solomon 8/11/2021
const AuthForm = (props) => {
    const endpoint = props.endpoint;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitFormHandler = async e => {
        e.preventDefault();
        try {
            const body = {
                "username": username,
                "password": password
            };
            const response = await fetch(endpoint, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            });
            const parseRes = await response.text();
            console.log(parseRes);
            if (response.status === 200) {
                if (props.setAuth !== undefined) {
                    props.setAuth(true);
                    toast.success("Logged in!")
                }
                if (props.setReg !== undefined) {
                    props.setReg(true);
                    toast.success("Account created!")
                }
            }
            else if (response.status === 401) {

                if (parseRes === "Username already exists!"){
                    props.setReg(true);
                    toast.warn("This username is already in use");
                }
                // notify about incorrect password or already used username
                toast.error("Username or password not recognized.")
            }
            e.target.value = "";
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <form className="mt-5 center form-floating" onSubmit={submitFormHandler}>
                <div class="form-floating mb-3">
                    <input type="username"
                        class="form-control"
                        id="floatingInput"
                        placeholder="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                    <label for="floatingInput">username</label>
                </div>

                <div class="form-floating">
                    <input type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                    <label for="floatingPassword">password</label>
                </div>
                <button type="submit" className="mt-3 btn btn-primary">{props.name}</button>
            </form>
        </Fragment>
    )
}

export default AuthForm;