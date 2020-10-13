import { shallow } from 'enzyme';
import React from 'react';
import ChatBox from './ChatBox';

describe('Chatbox', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<ChatBox />);
        expect(wrapper.exists()).toBe(true);
    });
    it('renders out chatz', () => {
        const wrapper = shallow(<ChatBox />);
        wrapper.setState({
            messages: [
                {
                    sender: "you",
                    message: "Hello, World!",
                    key: 1
                },
                {
                    sender: "dog",
                    message: "Bork?",
                    key: 2
                }
            ]
        });
        expect(wrapper.find(".message")).toHaveLength(2);
    });
    it('styles the different senders out properly', () => {
        const wrapper = shallow(<ChatBox />);
        wrapper.setState({
            messages: [
                {
                    sender: "you",
                    message: "Hello, World!",
                    key: 1
                }
            ]
        });
        expect(wrapper.find(".message > .userMessage")).toHaveLength(1);
        wrapper.setState({
            messages: [
                {
                    sender: "dog",
                    message: "Hello, World!",
                    key: 1
                }
            ]
        });
        expect(wrapper.find(".message > .dogMessage")).toHaveLength(1);
        wrapper.setState({
            messages: [
                {
                    sender: "system",
                    message: "Hello, World!",
                    key: 1
                }
            ]
        });
        expect(wrapper.find(".message > span")).toHaveLength(0);
    });
});
