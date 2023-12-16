import React from "react";

const Message = ({user,message,type}) => {
    return (
       <div className={"Messaje"+type}>{user}{message}</div>
    )
};

export default Message;
