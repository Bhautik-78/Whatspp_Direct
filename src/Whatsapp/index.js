import React, {useState, useEffect} from 'react';
import {CountryList} from '../globalUtility/CONST'
import {useHistory} from 'react-router-dom'
import {Col, Row, Card} from "reactstrap";
import {Modal,Popover} from 'antd';
import CreateIcon from '@material-ui/icons/Create';
import firebase, {db} from '../firebase'
import "firebase/auth";
import pic2 from '../Assets/images.jpg'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import '../Assets/style.css'
import "./login.css";

const WhatsApp = () => {

    const history = useHistory();

    const [detail, setDetail] = useState({country: CountryList[0].code + CountryList[0].dial_code});
    const [font, setFont] = useState({textDecoration: false, fontWeight: false, fontStyle: false});
    const [isFocus, setIsFocus] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const [isAddress, setAddress] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState({isLogIn: "",});

    const text = <span>Title</span>;
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    const sendMessage = async (payload) => {
        await db.collection('users').add(payload)
            .then(async documentReference => {
                console.log('document reference ID', documentReference.id)
            })
            .catch(error => {
                console.log(error.message)
            })
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setAuth({
                    isLogIn: true,
                })
            } else {
                console.log("No User Signed In");
            }
        });
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetail({...detail, [name]: value})
    };

    const resetForm = () => {
        setDetail((prevState) => ({
            ...prevState,
            phone: "",
            message: "",
            homeAddress: ""
        }))
    };

    const sendClicked = async () => {
        const dialCode = "+".concat(detail.country.split("+")[1]);
        const reDirectUrl = `https://api.whatsapp.com/send?phone=${dialCode}${detail.phone}&text=${detail.message}`
        window.open(reDirectUrl, '_blank');
        resetForm();
    };

    const fontChange = () => {
        setIsToggle(!isToggle)
    };

    const handleCancel = () => {
        setPopUp(false);
        setLoading(false);
    };

    const onPopUp = () => {
        if(localStorage.getItem("user")){
            setAddress(!isAddress)
        } else {
            setPopUp(true);
        }
    };

    const onCancel = () =>{
        setAddress(!isAddress)
    };

    const onSignIn = async () => {
        const provider = new firebase.firebase_.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const token = credential.accessToken;
                const user = result.user;
                localStorage.setItem("user", JSON.stringify(user));
                setDetail(result);
                if (result) {
                    history.push('/whatsapp');
                }
                setPopUp(false)
            }).catch((error) => {
            console.log(error)
        });
    };

    const onAddress = async () => {
        const data = JSON.parse(localStorage.getItem('user'))
        await sendMessage({HomeAddress: detail.homeAddress , Email: data.email});
        resetForm();
        setAddress(!isAddress)
    };

    const onHomeAddress = async (callback) => {debugger
        // await db.collection('users').get({})
        //     .then(querySnapshot => {
        //         querySnapshot.forEach(doc => {
        //             console.log(querySnapshot)
        //         })
        //     }).catch(err => {
        //         console.log(err)
        //     })

        await db.collection("users").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data()}`);
                });
            });
    };

    // export const getProjects = async (callback) => {
    //     db.get().then(function(snapshot) {
    //         const data = snapshot.docs.map(doc => ({
    //             ...(doc.data() || {}),
    //             id: doc.id
    //         }))
    //         callback({ success: true, data })
    //     }).catch(function(error) {
    //         console.log("Error getting:", error);
    //         callback({ success: false, message: "something went wrong" })
    //     });
    // }

    return (
        <div className="whatsapp">
            <Modal
                visible={popUp}
                onCancel={handleCancel}
            >
                <div className="d-flex justify-content-center w-100">
                        <div className="google-btn">
                            <div className="google-icon-wrapper">
                                <img className="google-icon"
                                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                            </div>
                            <p className="btn-text" onClick={onSignIn}><b>Sign in with google</b></p>
                        </div>
                </div>

            </Modal>
            <Row>
                <Col md={1}/>
                <Col md={2}>
                    <div className="site-card-border-less-wrapper">
                        <Card className="card" title="Card title" bordered={false} style={{width: 300}}>

                        </Card>
                    </div>
                </Col>
                <Col md={6} className="container-fluid" style={{paddingLeft: 20}}>
                    <Row>
                        <img style={{margin: '8px 20px 0px 18px', height: '60px'}} src={pic2}/>
                        <h1 style={{marginTop: '20px', marginBottom: '35px',color: 'white', fontSize: 30}}>WhatsApp Direct</h1>
                    </Row>
                    <Row>
                        <Col id="phone_group" md={3} style={{paddingRight: 0}}>
                            <label id="country_code_label">{detail.country}</label>
                            <select id="country_code_selector" name="country" onChange={handleChange}
                                    value={detail.country}
                                    onBlur="changeLabelWithCountryCode();">
                                {
                                    CountryList.map((v) => (
                                        <option value={v.code + v.dial_code}>{v.name}</option>
                                    ))
                                }
                            </select>
                        </Col>
                        <Col col={9} style={{paddingLeft: 0}}>
                            <input onKeyUp="checkPhoneValidity()" onfocusout="checkPhoneValidity()"
                                   onFocus="checkPhoneValidity()" onChange={handleChange} type="tel" name="phone"
                                   id="phone" value={detail.phone} placeholder="Phone Number"/>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={12}>
                            {!isFocus && <button style={{
                                position: 'absolute',
                                top: '45px',
                                color: 'white',
                                right: '41px',
                                outline: "none",
                                background: 'rgb(77, 93, 83)',
                                padding: '5px',
                                borderRadius: '10px',
                                border: "1px solid white"
                            }} onClick={fontChange}>Font Changes</button>}
                            <textarea id="message"
                                      style={{
                                          backgroundColor: "#4D5D53",
                                          color: "#ffffff",
                                          borderRadius: 10,
                                          textDecoration: font.textDecoration && 'underline',
                                          fontWeight: font.fontWeight && 700,
                                          fontStyle: font.fontStyle && 'italic'
                                      }}
                                      placeholder="Enter your Message" onKeyUp="messageTyping()"
                                      onFocus={() => {
                                          setIsFocus(true)
                                      }}
                                      onBlur={() => {
                                          setIsFocus(false)
                                      }}
                                      name="message"
                                      onChange={handleChange}
                                      value={detail.message}
                                      defaultValue={""}/>
                        </Col>
                    </Row>
                        <div className="whatsappSend" style={{marginBottom: 30}}>
                            <button style={{borderRadius: 10, border: "1px solid black", outline: "none"}}
                                    className="btn col-md-2" id="send"
                                    onClick={sendClicked}>Whatsapp
                            </button>
                        </div>

                    <div style={{marginBottom: 30}}>
                        <Popover placement="topLeft" title={text} content={content} trigger="click">
                            <button style={{
                                marginTop: 5,
                                marginRight: '30px',
                                backgroundColor: "#4D5D53",
                                color: "#ffffff",
                                borderRadius: 10,
                                border: "1px solid",
                                outline: "none"
                            }}>
                                <i  style={{marginLeft: 10}}><CreateIcon/></i></button></Popover>
                        <button style={{
                            marginTop: 5,
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            border: "1px solid",
                            outline: "none"
                        }} onClick={() => {
                            setDetail({...detail, message: "Hi"})
                        }}>Hi
                        </button>
                        <button style={{
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            border: "1px solid",
                            outline: "none"
                        }} onClick={() => {
                            setDetail({...detail, message: "Hello"})
                        }}>Hello
                        </button>
                        <button style={{
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            border: "1px solid",
                            outline: "none"
                        }} onClick={() => {
                            setDetail({...detail, message: "How are you?"})
                        }}>How are you?
                        </button>
                        <button style={{
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            border: "1px solid",
                            outline: "none"
                        }} onClick={onHomeAddress}>Email
                        </button>
                        <br/>
                    </div>

                    <div>
                        <button style={{
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            border: "1px solid",
                            outline: "none"
                        }} onClick={onHomeAddress}>Home Address
                        </button>
                        <button style={{
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            border: "1px solid",
                            outline: "none"
                        }} onClick={onHomeAddress}>Bussiness Address
                        </button>
                        <br/>
                    </div>

                    {/*<button style={{*/}
                    {/*    marginRight: '30px',*/}
                    {/*    backgroundColor: "#4D5D53",*/}
                    {/*    color: "#ffffff",*/}
                    {/*    borderRadius: 10,*/}
                    {/*    outline: "none",*/}
                    {/*    marginTop: "5px"*/}
                    {/*}} onClick={() => {*/}
                    {/*    setDetail({...detail, message: "Hi"})*/}
                    {/*}}>Hi*/}
                    {/*</button>*/}
                    {/*<button style={{*/}
                    {/*    marginRight: '30px',*/}
                    {/*    backgroundColor: "#4D5D53",*/}
                    {/*    color: "#ffffff",*/}
                    {/*    borderRadius: 10,*/}
                    {/*    outline: "none"*/}
                    {/*}} onClick={() => {*/}
                    {/*    setDetail({...detail, message: "Hello"})*/}
                    {/*}}>Hello*/}
                    {/*</button>*/}
                    {/*<button style={{*/}
                    {/*    marginRight: '30px',*/}
                    {/*    backgroundColor: "#4D5D53",*/}
                    {/*    color: "#ffffff",*/}
                    {/*    borderRadius: 10,*/}
                    {/*    outline: "none"*/}
                    {/*}} onClick={() => {*/}
                    {/*    setDetail({...detail, message: "How are you?"})*/}
                    {/*}}>How are you?*/}
                    {/*</button>*/}
                    {/*<button style={{*/}
                    {/*    marginRight: '30px',*/}
                    {/*    backgroundColor: "#4D5D53",*/}
                    {/*    color: "#ffffff",*/}
                    {/*    borderRadius: 10,*/}
                    {/*    outline: "none"*/}
                    {/*}}*/}
                    {/*        onClick={onHomeAddress}>Home Address*/}
                    {/*    <i onClick={onPopUp} style={{marginLeft:10}}><CreateIcon/></i>*/}
                    {/*</button>*/}
                    {/*<br/>*/}



                    {isToggle && <div style={{marginTop: "30px"}}>
                        <button style={{
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            outline: "none"
                        }} onClick={() => {
                            setFont({...font, fontWeight: !font.fontWeight})
                        }}>Bold
                        </button>
                        <button style={{
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            outline: "none"
                        }} onClick={() => {
                            setFont({...font, fontStyle: !font.fontStyle})
                        }}>Italic
                        </button>
                        <button style={{
                            marginRight: '30px',
                            backgroundColor: "#4D5D53",
                            color: "#ffffff",
                            borderRadius: 10,
                            outline: "none"
                        }} onClick={() => {
                            setFont({...font, textDecoration: !font.textDecoration})
                        }}>UnderLine
                        </button>
                    </div>}

                    {isAddress &&
                        <>
                    <textarea id="message"
                              style={{
                                  backgroundColor: "#4D5D53",
                                  color: "#ffffff",
                                  borderRadius: 10,
                                  textDecoration: font.textDecoration && 'underline',
                                  fontWeight: font.fontWeight && 700,
                                  fontStyle: font.fontStyle && 'italic'
                              }}
                              placeholder="Enter your Home Address" onKeyUp="messageTyping()"
                              onFocus={() => {
                                  setIsFocus(true)
                              }}
                              onBlur={() => {
                                  setIsFocus(false)
                              }}
                              name="homeAddress"
                              onChange={handleChange}
                              value={detail.homeAddress}
                              defaultValue={""}/>
                            <div style={{ float:"right"}}>
                                <button style={{
                                    bottom: "10px",borderRadius:10,border:"1px solid black",outline:"none",marginRight:30}} className="btn col-md-2" id="send"
                                        onClick={onAddress}>Submit
                                </button>
                                <button style={{bottom: "10px",borderRadius:10,border:"1px solid black",outline:"none"}} className="btn col-md-2"
                                        onClick={onCancel}>Cancel
                                </button></div>
                              </>}

                </Col>
                <Col md={2}>
                    <div className="site-card-border-less-wrapper">
                        <Card title="Card title" bordered={false} style={{width: 300}}>

                        </Card>
                    </div>
                </Col>
                <Col md={1}/>
            </Row>
        </div>
    )
};

export default WhatsApp;
