import React,{useState,useEffect} from 'react';
import {CountryList} from '../globalUtility/CONST'
import axios from 'axios'
import $ from "jquery";
import { Col,  Row,Card} from "reactstrap";
import pic1 from '../Assets/6.jpg'
import pic2 from '../Assets/images.jpg'
import '../App.css'
import '../Assets/style.css'

const WhatsApp = () => {

    const [detail,setDetail] = useState({country:CountryList[0].code + CountryList[0].dial_code});

    const[font,setFont] = useState({textDecoration: false,fontWeight: false, fontStyle: false});

    const[isFocus,setIsFocus] = useState(false);

    const[isToggle,setIsToggle] = useState(false);


    useEffect(async ()=>{
        const response = await axios.get(`http://localhost:3000/whatsapp?refresh_token=${localStorage.getItem('refresh_token')}`);
        console.log(response.data)
    },[]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetail({...detail, [name]: value})
    };

    const sendClicked = () => {
        const dialCode = "+".concat(detail.country.split("+")[1]);
        window.open(`https://api.whatsapp.com/send?phone=${dialCode}${detail.phone}&text=${detail.message}`, '_blank');
    };

    const fontChange = ( ) => {
        setIsToggle(!isToggle)
    };

    return(
        <>

            <div className="App">
                <div className="demo" style={{height:60}}>
                    <span style={{float:"right",display:"inline-flex"}}><h4 style={{color:'beige',marginTop:14}}>Username</h4><img style={{marginLeft:10,marginRight:10,marginTop:5,height:50,width:50}} src={pic1}/></span>
                </div>
            </div>
            <Row>
                <Col md={1}/>
                <Col md={2}>
                    <div className="site-card-border-less-wrapper">
                        <Card title="Card title" bordered={false} style={{ width: 300 }}>

                        </Card>
                    </div>
                </Col>
                <Col md={6} className=" container">
                    <Row>
                    <img style={{margin: '13px 20px 0px 18px', height: '75px'}} src={pic2}/>
                    <h1 style={{marginTop: '20px', marginBottom: '35px'}}>WhatsApp Direct</h1>
                    </Row>
                    <Row>
                        <Col id="phone_group" md={2}>
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
                        <Col col={10}>
                            <input onKeyUp="checkPhoneValidity()" onfocusout="checkPhoneValidity()"
                                   onFocus="checkPhoneValidity()" onChange={handleChange} type="tel" name="phone"
                                   id="phone" placeholder="Phone Number"/>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={12}>
                            {!isFocus && <button  style={{position: 'absolute', top: '45px',color: 'white', right: '41px', background: 'rgb(77, 93, 83)', padding: '5px', borderRadius: '10px' ,border: "1px solid white"}} onClick={fontChange}>Font Changes</button>}
                            <textarea id="message"
                                      style={{backgroundColor: "#4D5D53", color: "#ffffff" ,borderRadius: 10, textDecoration: font.textDecoration && 'underline',fontWeight: font.fontWeight && 700, fontStyle: font.fontStyle &&'italic'}}
                                      placeholder="Enter your Message" onKeyUp="messageTyping()"
                                      onFocus={() => {setIsFocus(true)}}
                                      onBlur={() => {setIsFocus(false)}}
                                      name="message"
                                      onChange={handleChange}
                                      value={detail.message}
                                      defaultValue={""}/>
                        </Col>
                    </Row>
                    <div>
                        <button style={{marginRight: '30px',borderRadius:10}} className="btn col-md-2" id="send"
                                onClick={sendClicked}>SMS
                        </button>
                        <button style={{marginRight: '30px',borderRadius:10}} className="btn col-md-2" id="send"
                                onClick={sendClicked}>Business
                        </button>
                        <button style={{marginRight: '30px',borderRadius:10}} className="btn col-md-2" id="send"
                                onClick={sendClicked}>Whatsapp
                        </button>
                        <br/><br/>
                    </div>


                    <button style={{marginRight: '10px',backgroundColor:"#4D5D53",color:"#ffffff",borderRadius:10}} onClick={() => {
                        setDetail({...detail, message: "Hi"})
                    }}>Hi
                    </button>
                    <button style={{marginRight: '10px',backgroundColor:"#4D5D53",color:"#ffffff",borderRadius:10}} onClick={() => {
                        setDetail({...detail, message: "Hello"})
                    }}>Hello
                    </button>
                    <button style={{marginRight: '10px',backgroundColor:"#4D5D53",color:"#ffffff",borderRadius:10}} onClick={() => {
                        setDetail({...detail, message: "How are you?"})
                    }}>How are you?
                    </button><br/>

                    { isToggle && <div  style={{marginTop: "20px"}} >
                        <button style={{marginRight: '10px',backgroundColor:"#4D5D53",color:"#ffffff",borderRadius:10}} onClick={() => {
                            setFont({...font,fontWeight: !font.fontWeight})
                        }}>Bold
                        </button>
                        <button style={{marginRight: '10px',backgroundColor:"#4D5D53",color:"#ffffff",borderRadius:10}} onClick={() => {
                            setFont({...font,fontStyle: !font.fontStyle})
                        }}>Italic
                        </button>
                        <button style={{marginRight: '10px',backgroundColor:"#4D5D53",color:"#ffffff",borderRadius:10}} onClick={() => {
                            setFont({...font,textDecoration: !font.textDecoration})
                        }}>UnderLine
                        </button>
                    </div>}

                </Col>
                <Col md={2}>
                    <div className="site-card-border-less-wrapper">
                        <Card title="Card title" bordered={false} style={{ width: 300 }}>

                        </Card>
                    </div>
                </Col>
                <Col md={1}/>
            </Row>
        </>
    )
};

export default WhatsApp;
