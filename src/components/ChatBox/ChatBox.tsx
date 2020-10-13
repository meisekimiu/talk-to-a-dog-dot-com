import React, {Component} from 'react';
import ChatForm from "./ChatForm";
// import "./ChatBox.css";

enum ChatSender {
    YOU = "you",
    DOG = "dog",
    SYSTEM = "system"
}

interface ChatMessage {
    message: string;
    sender: ChatSender;
    key: number;
}

class ChatBox extends Component<{}, {messages: ChatMessage[]}> {
    public static chatID: number = 0;

    constructor(props: any) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    getMessageClassName(message: ChatMessage): string {
        if (message.sender === ChatSender.YOU) {
            return "userMessage";
        } else if (message.sender === ChatSender.DOG) {
            return "dogMessage";
        }
        return "systemMessage";
    }

    chatLabel(message: ChatMessage) {
        if (message.sender === ChatSender.YOU || message.sender === ChatSender.DOG) {
            return (<span className={this.getMessageClassName(message)}>{message.sender}:</span>);
        } else {
            return "";
        }
    }

    getChatMessages() {
        return this.state.messages.map((message) => {
            return (
                <div className="message" key={message.key}>{this.chatLabel(message)} {message.message}</div>
            )
        });
    }

    sendMessage(message: string): void {
        const messages = this.state.messages.concat([
            {
                message,
                sender: ChatSender.YOU,
                key: ChatBox.chatID++
            }
        ]);
        this.setState({
            messages
        })
    }

    render() {
        return (
            <main>
                <div className="messages">
                    { this.getChatMessages() }
                </div>
                <div className="form">
                    <ChatForm onSend={this.sendMessage.bind(this)} />
                </div>
            </main>
        );
    }
}

export default ChatBox;
