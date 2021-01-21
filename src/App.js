import React,{useState} from 'react';
import {CountryList} from './globalUtility/CONST'
import { Col,  Row,Card} from "reactstrap";
import pic1 from './Assets/6.jpg'

import './App.css'
import './Assets/style.css'

const App = () => {

    const [detail,setDetail] = useState({country:CountryList[0].code + CountryList[0].dial_code});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetail({...detail, [name]: value})
    };

    const sendClicked = () => {
        const dialCode = "+".concat(detail.country.split("+")[1]);
        window.open(`https://api.whatsapp.com/send?phone=${dialCode}${detail.phone}&text=${detail.message}`, '_blank');
    };

  return(
      <>
          <div className="App ">
              <div className="demo" style={{height:60}}>
                  <span style={{float:"right",display:"inline-flex"}}><h4 style={{color:'beige',marginTop:14}}>Username</h4><img style={{marginLeft:10,marginRight:10,marginTop:5,height:50,width:50}} src={pic1}/></span>
              </div>
          </div>
          <Row>
              <Col md={3}>
                  <div className="site-card-border-less-wrapper">
                      <Card title="Card title" bordered={false} style={{ width: 300 }}>

                      </Card>
                  </div>
              </Col>
              <Col md={6} className=" container">
                  <h1 style={{marginTop: '20px', marginBottom: '35px'}}>WhatsApp Direct</h1>
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
                <textarea id="message" placeholder="Enter your Message" onKeyUp="messageTyping()"
                          onfocusout="messageTyping()" onFocus="messageTyping()" name="message" onChange={handleChange}
                          value={detail.message}
                          defaultValue={""}/>
                      </Col>
                  </Row>
                  <div>
                      <button style={{marginRight: '30px'}} className="btn col-md-2" id="send"
                              onClick={sendClicked}>SMS
                      </button>
                      <button style={{marginRight: '30px'}} className="btn col-md-2" id="send"
                              onClick={sendClicked}>Business
                      </button>
                      <button style={{marginRight: '30px'}} className="btn col-md-2" id="send"
                              onClick={sendClicked}>Whatsapp
                      </button>
                      <br/><br/>
                  </div>


                  <button style={{marginRight: '10px'}} onClick={() => {
                      setDetail({...detail, message: "Hi"})
                  }}>Hi
                  </button>
                  <button style={{marginRight: '10px'}} onClick={() => {
                      setDetail({...detail, message: "Hello"})
                  }}>Hello
                  </button>
                  <button style={{marginRight: '10px'}} onClick={() => {
                      setDetail({...detail, message: "Email"})
                  }}>Email
                  </button>
                  <button style={{marginRight: '10px'}} onClick={() => {
                      setDetail({...detail, message: "How are you?"})
                  }}>How are you?
                  </button>
              </Col>
              <Col md={3}>
                  <div className="site-card-border-less-wrapper">
                      <Card title="Card title" bordered={false} style={{ width: 300 }}>

                      </Card>
                  </div>
              </Col>
          </Row>
      </>
  )
};

export default App;
