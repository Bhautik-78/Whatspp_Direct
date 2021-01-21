import React,{useState} from 'react';
import {CountryList} from './globalUtility/CONST'
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './App.css'
import './Assets/style.css'

const App = () => {

    const [detail,setDetail] = useState({country:CountryList[0].code + CountryList[0].dial_code});
    const [state,setState] = useState({
        tags: ['Unremovable', 'Tag 2', 'Tag 3'],
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    });

    const handleChange = (e) => {debugger
        const {name, value} = e.target;
        setDetail({...detail, [name]: value})
    };

    const sendClicked = () => {
        const dialCode = "+".concat(detail.country.split("+")[1]);
        debugger
        window.open(`https://api.whatsapp.com/send?phone=${dialCode}${detail.phone}&text=${detail.message}`, '_blank');
    };


    const handleClose = removedTag => {
        const tags = state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        setState({ tags });
    };

    const showInput = () => {
        setState({ inputVisible: true }, () => this.input.focus());
    };

    const handleInputChange = e => {
        setState({ inputValue: e.target.value });
    };

    const handleInputConfirm = () => {
        const { inputValue } = state;
        let { tags } = state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    const handleEditInputChange = e => {
       setState({ editInputValue: e.target.value });
    };

    const handleEditInputConfirm = () => {
       setState(({ tags, editInputIndex, editInputValue }) => {
            const newTags = [...tags];
            newTags[editInputIndex] = editInputValue;

            return {
                tags: newTags,
                editInputIndex: -1,
                editInputValue: '',
            };
        });
    };

    const saveInputRef = input => {
        this.input = input;
    };

    const saveEditInputRef = input => {
        this.editInput = input;
    };

    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = state;

  return(
    <>
        <div className=" container">
          <h1     style={{marginTop:'20px',marginBottom:'35px'}} >WhatsApp Direct</h1>
            <form id="theForm">
                <div id="phone_group" >
                    <label id="country_code_label">{detail.country}</label>
                    <input onKeyUp="checkPhoneValidity()" onfocusout="checkPhoneValidity()"
                           onFocus="checkPhoneValidity()" onChange={handleChange} type="tel" name="phone"
                           id="phone" placeholder="Phone Number"/>
                    <select id="country_code_selector" name="country" onChange={handleChange} value={detail.country}
                            onBlur="changeLabelWithCountryCode();">
                        {
                            CountryList.map((v)=> (
                                <option value={v.code + v.dial_code}>{v.name}</option>
                            ))
                        }

                    </select>
                </div>
                <textarea id="message" placeholder="Message (Optional)" onKeyUp="messageTyping()"
                          onfocusout="messageTyping()" onFocus="messageTyping()" name="message" onChange={handleChange}
                          defaultValue={""}/>
                <button  className="btn col-md-2" id="send" onClick={sendClicked}>SMS</button>
                <button style ={{marginRight: '30px'}} className="btn col-md-2" id="send" onClick={sendClicked}>Business</button>
                <button style ={{marginRight: '30px'}} className="btn col-md-2" id="send" onClick={sendClicked}>Whatsapp</button>


                {tags.map((tag, index) => {
                    if (editInputIndex === index) {
                        return (
                            <Input
                                ref={saveEditInputRef}
                                key={tag}
                                size="small"
                                className="tag-input"
                                value={editInputValue}
                                onChange={handleEditInputChange}
                                onBlur={handleEditInputConfirm}
                                onPressEnter={handleEditInputConfirm}
                            />
                        );
                    }

                    const isLongTag = tag.length > 20;

                    const tagElem = (
                        <Tag
                            className="edit-tag"
                            key={tag}
                            closable={index !== 0}
                            onClose={() => handleClose(tag)}
                        >
              <span
                  onDoubleClick={e => {
                      if (index !== 0) {
                          setState({ editInputIndex: index, editInputValue: tag }, () => {
                              state.editInput.focus();
                          });
                          e.preventDefault();
                      }
                  }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                            {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                })}
                {inputVisible && (
                    <Input
                        ref={saveInputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag className="site-tag-plus" onClick={showInput}>
                        <PlusOutlined /> New Tag
                    </Tag>
                )}

            </form>
        </div>
      </>
  )
};

export default App;
