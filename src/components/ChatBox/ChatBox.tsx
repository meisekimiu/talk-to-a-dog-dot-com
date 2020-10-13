import React, {Component} from 'react';
import ChatForm from "./ChatForm";
import "./ChatBox.css";

enum ChatSender {
    YOU = "you",
    DOG = "dog",
    SYSTEM = "system",
    OTHER = "other",
}

interface ChatMessage {
    message: string;
    sender: ChatSender;
    key: number;
}

class ChatBox extends Component<{}, {messages: ChatMessage[], connected: boolean, sniff: number, refundAsked: boolean, eegg: boolean}> {
    public static chatID: number = 0;

    protected chatBottom: HTMLDivElement | null;

    constructor(props: any) {
        super(props);
        this.chatBottom = null;
        this.state = {
            messages: [
                {
                    message: "You are now connected to a dog!",
                    sender: ChatSender.SYSTEM,
                    key: -99,
                },
                {
                    message: "Your dog is a golden retriever. Please say hello!",
                    sender: ChatSender.SYSTEM,
                    key: -98,
                }
            ],
            connected: false,
            sniff: 0,
            refundAsked: false,
            eegg: Math.random() < 0.01
        };
    }

    componentDidMount() {
        if (!this.state.connected) {
            setTimeout(() => {
                this.setState({connected: true});
            }, Math.random() * 3000 + 2000);
        }
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
            return (<span className={this.getMessageClassName(message)}>{message.sender.toLocaleUpperCase()}:</span>);
        } else {
            return "";
        }
    }

    getChatMessages() {
        if (!this.state.connected) {
            return (
                <div className="connection">Connecting YOU to a real dog now...</div>
            );
        }
        return this.state.messages.map((message) => {
            const classNames = ["message"];
            if (message.sender === ChatSender.SYSTEM) {
                classNames.push("systemMessage");
            }
            return (
                <div className={classNames.join(" ")} key={message.key}>{this.chatLabel(message)} {message.message}</div>
            );
        });
    }

    sendMessage(message: string): void {
        this.pushMessageToQueue(message, ChatSender.YOU);
        setTimeout(() => {
            this.sendDogMessage();
        }, Math.random() * 2500);
    }

    createDogString(): string {
        // Ported basically from the original talktoadog source
        const dogNoizes = ["woof", "bark", "growl", "arf", "ruff", "yap", "yip", "bow wow", "bork", "awooo", "pant"];
        const punctuation = [".", "!", "?", ","];
        let message: string[] = [];
        const wordCount = Math.floor(Math.random() * 15) + 1;
        let afterPunctuation: boolean = false;
        for (let i = 0; i < wordCount; i++) {
            let word = dogNoizes[Math.floor(Math.random() * dogNoizes.length)];
            if(i === 0 || afterPunctuation) {
                word = word.charAt(0).toLocaleUpperCase() + word.slice(1);
            }
            afterPunctuation = false;
            if(Math.floor(Math.random() * 5) && i !== wordCount - 1)
            {
                const punc = punctuation[Math.floor(Math.random()*4)];
                word += punc;
                afterPunctuation = punc !== ",";
            } else if (i === wordCount - 1) {
                word += punctuation[Math.floor(Math.random()*3)];
            }
            message.push(word);
        }
        return message.join(" ");
    }

    isFirstDogMessage(): boolean {
        return this.state.messages.filter(msg => msg.sender === ChatSender.DOG).length === 0;
    }

    doesLastHumanMessageContain(pattern: RegExp): boolean {
        const messages = this.state.messages.filter(msg => msg.sender === ChatSender.YOU);
        if (messages && messages.length > 0) {
            if (messages.pop()!.message.match(pattern)) {
                return true;
            }
        }
        return false;
    }

    sendDogMessage(): void {
        let message = "";
        if (this.state.eegg) {
            const eggMessages = [
                "HELP! I'M TRAPPED AT TALKTOADOG.COM HEADQUARTERS AND I'M FORCED TO DO THIS JOB AGAINST MY WILL!",
                "I DON'T HAVE MUCH TIME!",
                "You have to listen to me. You must spread the word of this awful website!",
                "There are thousands of people trapped here!",
                "PLEASE HELP US",
                "THE CHAT HAS BEEN DISCONNECTED"
            ];
            const eggState = this.state.sniff;
            if (eggState < eggMessages.length) {
                message = eggMessages[eggState];
                this.setState({sniff: eggState + 1});
                let sender = eggState === eggMessages.length - 1 ? ChatSender.SYSTEM : ChatSender.DOG;
                this.pushMessageToQueue(message, sender);
            }
            return;
        } else if (this.isFirstDogMessage()) {
            message = "HELLO! I AM A GOLDEN RETRIEVER. I AM A DOG.";
        } else if (this.state.sniff < 3 && (this.state.sniff > 0 || this.doesLastHumanMessageContain(/sniff/i))) {
            const sniffMessages = [
                "I LIKE TO SNIFF, MOSTLY.",
                "THERE ARE TIMES IT LOSES ITS CHARM, IF WE ARE BEING BRUTALLY HONEST",
                "LOL IDK WHAT I WANT. LOL",
            ];
            const sniffState = this.state.sniff;
            message = sniffMessages[sniffState];
            this.setState({sniff: sniffState + 1});
        } else if (!this.state.refundAsked && this.doesLastHumanMessageContain(/refund/i)) {
            message = "HELLO! I AM NOT PROGRAMMED TO RESPOND IN THAT AREA.";
            this.setState({refundAsked: true});
        } else {
            message = this.createDogString();
        }
        this.pushMessageToQueue(message, ChatSender.DOG);
    }

    pushMessageToQueue(message: string, sender: ChatSender): void {
        const messages = this.state.messages.concat([
            {
                message,
                sender,
                key: ChatBox.chatID++
            }
        ]);
        this.setState({
            messages
        });
        setTimeout(() => {
            if (this.chatBottom) {
                this.chatBottom.scrollIntoView({behavior: "smooth"});
            }
        });
    }

    render() {
        return (
            <main>
                <div className="messages">
                    { this.getChatMessages() }
                    <div ref={(element) => {this.chatBottom = element}} />
                </div>
                <div className="form">
                    <ChatForm onSend={this.sendMessage.bind(this)} disabled={!this.state.connected} />
                </div>
            </main>
        );
    }
}

export default ChatBox;
