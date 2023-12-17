import React from "react";

const Message = ({ user, message, type }) => {
    return (
        <div className={"Messaje" + type}>
            <span className="nick">{user}</span>
            <p className="texto">{message}</p>
        </div>
    )
};

export default Message;
