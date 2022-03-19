import React, { useState } from 'react'
import Notecontext from './Notecontext'

const Notestate = (props) => {
    const host = "http://localhost:5000"
    const notesinit = []
    const [notes, setnotes] = useState(notesinit);

// get notes
    const getnote = async() => {
        // api call
        const response = await fetch(`${host}/api/notes/notesdata`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            },
        });
        const json=await response.json();
        setnotes(json);
    }

    // add a note
    const addnote = async(title, description, tag) => {
        // api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        const note =await response.json();
        setnotes(notes.concat(note));
    }

    // delete note
    const deletenote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            }
        });
        const json =await response.json();
        console.log(json);
        // console.log("deleting a note" + id);
        const newnotes = notes.filter((note) => {
            return note._id !== id
        })
        setnotes(newnotes);

    }

    // edit note
    const editnote = async (id, title, description, tag) => {
        // api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });
        // const json = response.json();
        // logic to edit
        let newnotes=JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].title = title;
                newnotes[index].description = description;
                newnotes[index].tag = tag;
                break;
            }
        }
        setnotes(newnotes);

    }
    return (
        <Notecontext.Provider value={{ notes, addnote, deletenote, editnote,getnote }}>
            {props.children}
        </Notecontext.Provider>
    )

}
export default Notestate