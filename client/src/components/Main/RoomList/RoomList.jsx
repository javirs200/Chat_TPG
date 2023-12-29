import React, { useEffect,useState } from "react"
import Room from "./Room/Room"
import { v4 as uuidv4 } from "uuid";

const RoomList = () => {

    const [rooms, setRooms] = useState([])

    useEffect(()=>{
        async function fetchData() {
            await fetch('/rooms/')
            .then(response => response.json())
            .then(data => {
                setRooms(data.rooms);
            });
        }
        fetchData()
    }, [])

    const drawlist = ()=> {
        return rooms.map((r)=><Room key={uuidv4()} name={r.name}/>)
    }

    return (
        <div className='RoomList'>
            <h2>RoomList</h2>
            {rooms ? drawlist() : ''}
        </div>
    );
}

export default RoomList;
