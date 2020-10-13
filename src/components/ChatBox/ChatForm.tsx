import React, {useState, FormEvent} from 'react';
import PropTypes from 'prop-types';

function ChatForm(props: any) {
    const [message, setMessage] = useState("");
    const submit = (e: FormEvent) => {
        const msg = message.trim();
        if (msg !== "") {
            props.onSend(msg);
            setMessage("");
        }
        if (e) {
            e.preventDefault();
        }
    }
    return (
        <form onSubmit={submit}>
            <input type="text" className="textfield" onChange={e => setMessage(e.target.value)} value={message} />
        </form>
    );
}

ChatForm.propTypes = {
    onSend: PropTypes.func.isRequired
}

export default ChatForm;
