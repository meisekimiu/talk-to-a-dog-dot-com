import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import ChatForm from './ChatForm';

describe('ChatForm', () => {
    let message: string = "";
    const onSend = (msg: string) => {
        message = msg;
    };
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        message = "";
        wrapper = shallow(<ChatForm onSend={onSend} />);
    });
    it('should exist', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('should submit message to parent', () => {
        wrapper.find(".textfield").simulate("change", {target: {value: "Hello World"}});
        expect(wrapper.find(".textfield").prop("value")).toBe("Hello World");
        wrapper.find("form").simulate("submit");
        expect(message).toBe("Hello World");
        expect(wrapper.find(".textfield").prop("value")).toBe("");
    });
    it('should not submit empty message', () => {
        message = "not sent";
        wrapper.find("form").simulate("submit");
        wrapper.find(".textfield").simulate("change", {target: {value: "            "}});
        wrapper.find("form").simulate("submit");
        expect(message).toBe("not sent");
    });
    it('should trim messages', () => {
        wrapper.find(".textfield").simulate("change", {target: {value: "     test       "}});
        wrapper.find("form").simulate("submit");
        expect(message).toBe("test");
    });
});
