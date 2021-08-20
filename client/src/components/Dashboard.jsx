import React, {Fragment} from "react";
import { toast } from 'react-toastify';

const Dashboard = (props) =>{
    const logout = async () => {
        try {
            const response = await fetch(
            "http://localhost:5000/auth/logout",
                {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            if (response.status === 200){
                console.log("Bearer token cookie removed / Logged out.");
                toast.info("Logged out!");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <button className="btn btn-primary" 
                onClick={ () => {
                    props.setAuth(false);
                    logout();
                    console.log("Trying to delete cookies");
                }}>
                Log out
            </button>
        </Fragment>
    );
};

export default Dashboard;