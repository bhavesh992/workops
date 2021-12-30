import React,{useState} from 'react';
import "../styles/Auth.css";
import { Link,useHistory} from 'react-router-dom';
import {Form ,Col , Button  } from 'react-bootstrap';
import {useDispatch} from 'react-redux';


const Auth = ({mode,headerText,errorMessage,onSubmit,history}) => {
    const dispatch = useDispatch();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    // let history = useHistory();
    const sendInfo=async (e)=>{
        e.preventDefault();
        
        //Way 1:
        // let res=await onSubmit(email,password,dispatch);
        // if(res){
        //     history.push("/dashboard");
        // }

        //way 2:
        onSubmit(email,password,dispatch)
        .then(res=>{
            console.log(errorMessage);
            if(res){
                //option 1:
                // window.location = "/signin"

                //Option 2:
                 history.push("/dashboard");

                //option 3 isto use useHistory() hook
            }
        });
    }
    return (
            <div className="auth">
                <div className="auth__box">
                    {/* <div className="auth__box__logo mb-2">
                        <img src="/images/logo.png" alt="" height="50"  width="250"/>
                    </div> */}
                    <h4 className="auth__box__header">{headerText}</h4>
                    <div className="auth__box__form">
                    <Form className="my-3">
                        <Form.Row className="my-2">
                            <Form.Group as={Col}>
                                <Form.Control 
                                    placeholder="Enter email"
                                    type="text"
                                    value={email}
                                    //If this field was normal input field instead of bootstarp input field
                                    //then we would have done:
                                    // onChange={(res)=>setEmail(res)}
                                    // onChange={setEmail}

                                    //but bcoz its bootstrap input field,we have to do :
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </Form.Group>
                        </Form.Row>
                    {  mode==="signup"
                        ?
                        <>
                            <Form.Row className="my-2">
                                <Form.Group as={Col}>
                                    <Form.Control 
                                        placeholder="Enter full name"
                                        name="description"
                                        type="text"
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row className="my-2">
                                <Form.Group as={Col}>
                                    <Form.Control 
                                        placeholder="Create Password"
                                        name="description"
                                        type="password"
                                        value={password}
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </Form.Group>
                            </Form.Row>
                            {errorMessage && <h5 className="auth__box__error">{errorMessage}</h5>}

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Button 
                                        variant="primary"
                                        onClick={sendInfo}
                                    >Continue</Button>
                                </Form.Group>
                            </Form.Row>
                        </>
                        :
                        <>
                            <Form.Row className="my-2">
                                <Form.Group as={Col}>
                                    <Form.Control 
                                        placeholder="Enter password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e)=>{setPassword(e.target.value)}}
                                    />
                                </Form.Group>
                            </Form.Row>
                    {errorMessage && <h5 className="auth__box__error">{errorMessage}</h5>}

                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Button 
                                        variant="primary"
                                        type="submit"
                                        // onClick={()=>onSubmit(email,password)}
                                        onClick={sendInfo}
                                    >Continue</Button>
                                </Form.Group>
                            </Form.Row>
                        </>
                        }                
                    </Form>
                    </div>
                    <h5 className="auth__box__OR">
                        OR
                    </h5>
                    <div className="auth__box__social">
                        <Button variant="light" className="mb-3">
                            <span className="mr-2">
                               <img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.174/static/media/google-logo.c21ca9d1.svg" alt="" height="18"  width="18"/>
                            </span>
                            <span>
                                Continue with Google
                            </span>
                        </Button>
                        <Button variant="light">
                            <span className="mr-2">
                               <img src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.174/static/media/microsoft-logo.319d9b9a.svg" alt="" height="18"  width="18"/>
                            </span>
                            <span>
                                Continue with Microsoft
                            </span>
                        </Button>
                    </div>
                    <div className="auth__box__footer">
                        {
                            mode==="signup"
                            ?
                            <ul>
                                <li> 
                                    <Link to="/signin">Already have an account? Sign in </Link>
                                </li>
                            </ul>    
                            :
                            <ul>
                                <li>
                                    <Link to="/forgotpassword">Forgot Password?</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Sign up for an account</Link> 
                                </li>
                            </ul>    
                        }

                    </div>
                </div>
            </div>
        );
}

export default Auth;
