import React,{useState} from 'react';
import {Card, Row, Col} from "antd";
import axios from 'axios'
import Loader from "../globalUtility/Loader";
import "./login.css";
import '../App.css'

const Login = () => {

    const [loading, setLoading] = useState(false);
    const onSignIn = async() => {
        let result = {};
        try {
            const res = await axios.get('http://localhost:3000/google/auth');
            if(res && res.data){
                window.location.href = res.data;
            }

        } catch (err) {
            console.log("error in getting entities : ", err)
        }
        return result
    };

    return(
        <>
            <Row >
                {
                    loading ?  <Loader/> : null
                }
                <Col span={5}/>
                <Col span={4} className="card-col " style={{marginTop: 100 }}>
                    <Card className="login_card row " style={{padding: '24px', width: "min-content", marginLeft: '40%'}}>
                        <h2 className="login-heading">Login</h2>
                        <div className="google-btn">
                            <div className="google-icon-wrapper">
                                <img className="google-icon"
                                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                            </div>
                            <p className="btn-text" onClick={onSignIn}><b>Sign in with google</b></p>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    )
};

export default Login;