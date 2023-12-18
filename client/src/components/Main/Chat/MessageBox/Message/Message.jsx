import React from "react";

const Message = ({ user, message, type, timestamp }) => {

    return (
        <div className={"Messaje" + type}>
            <div className="content">
                <span className="nick">{user.slice(0, 1).toUpperCase() + user.slice(1, user.length)}</span>
                <p className="texto">{message}</p>
            </div>
            <small className="timestamp">{timestamp}</small>
        </div>
    )
};

export default Message;
