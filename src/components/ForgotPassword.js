import React,{useState} from 'react';
import "../styles/Auth.css";
import { Link,useHistory} from 'react-router-dom';
import {Form ,Col , Button  } from 'react-bootstrap';
import WorkOpsApi from "../api/WorkOpsBackend";


const ForgotPassword = (props) => {
    // console.log(props);
    const [otp,setOtp]=useState("");
    const [otpEntered,setOtpEntered]=useState("");
    const [email,setEmail]=useState("");
    const [verified,setVerified]=useState(0);
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const generateOTP=()=>{
        WorkOpsApi.post("/api/otp",{email:email})
        .then(res=>{
            console.log(res.data.otp);
            if(res.data.otp){
                let o=res.data.otp.toString();
                setOtp(o);
                // console.log(otp);
            }
            else{
                alert(res.data);
            }
        });
    }
    const verifyOtp=()=>{
        if(otp===otpEntered){
            setVerified(1);
        }
        else{
            alert("Invalid OTP");
        }
    }
    const changePassword=()=>{
        if(password===confirmPassword){
            // console.log(email+"-- "+password);
            WorkOpsApi.post("/api/changepassword",{email,password})
            .then(res=>{
                console.log(res);
                if(res){
                    alert(res.data);
                    props.history.push("/signin");
                }
                else{
                    alert(res.data);
                }
            })
        }
        else{
            alert("New Password and Confirm Password should be same");
        }
    }
    return (
        <div className="auth">
            <div className="auth__box">
                {/* <div className="auth__box__logo mb-2">
                    <img src="/images/logo.png" alt="" height="50"  width="250"/>
                </div> */}
                <h4 className="auth__box__header">Forgot Password</h4>
                <div className="auth__box__form">
                <Form className="my-3">
                    <Form.Row className="my-2">
                        <Form.Group as={Col}>
                            <Form.Control 
                                placeholder="Enter email"
                                type="text"
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                                disabled={otp.length>0}
                            />
                        </Form.Group>
                    </Form.Row>
                    {/* {errorMessage && <h5 className="auth__box__error">{errorMessage}</h5>}                 */}
                    {otp.length>0 && verified===0 &&
                        <Form.Row className="my-2">
                            <Form.Group as={Col}>
                                <Form.Control 
                                    placeholder="Enter OTP"
                                    type="text"
                                    value={otpEntered}
                                    onChange={(e)=>{setOtpEntered(e.target.value)}}
                                />
                            </Form.Group>
                        </Form.Row>
                    }
                    {verified===1 &&
                        <>
                            <Form.Row className="my-2">
                                <Form.Group as={Col}>
                                    <Form.Control 
                                        placeholder="Enter Password"
                                        type="text"
                                        value={password}
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="my-2">
                            <Form.Group as={Col}>
                                <Form.Control 
                                    placeholder="Confirm Password"
                                    type="text"
                                    value={confirmPassword}
                                    onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                />
                                </Form.Group>
                            </Form.Row>
                        </>
                    }
                    <Form.Row>
                        <Form.Group as={Col}>
                            {otp.length===0 &&
                                <Button 
                                variant="primary"
                                onClick={generateOTP}
                                >
                                    Send OTP
                                </Button>
                            }
                            {otp.length> 0 && verified===0 &&
                                <Button 
                                    variant="primary"
                                    onClick={verifyOtp}
                                >
                                    Verify
                                </Button>
                            }
                            {verified===1 &&
                                <Button 
                                    variant="primary"
                                    onClick={changePassword}
                                >
                                    Change
                                </Button>
                            }
                        </Form.Group>
                    </Form.Row>
                </Form>
                </div>
                <div className="auth__box__footer" style={{marginTop:"2px"}}>
                    <ul>
                        <li>
                            <Link to="/signin">Sign In</Link> 
                        </li>
                    </ul>    
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
