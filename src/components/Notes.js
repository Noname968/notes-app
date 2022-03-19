import React, { useContext, useState, useEffect, useRef } from 'react'
import contextvalue from '../context/notes/Notecontext'
import Noteitems from './Noteitems';
import Addnote from './Addnote'
import { useHistory } from 'react-router';


const Notes = () => {
    const context = useContext(contextvalue);
    const { notes, getnote, editnote } = context;
    const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    let history = useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getnote();
        }
        else {
            history.push("/login");
        }
    }, [])
    const updatenote = ((currentNote) => {
        ref.current.click();
        setnote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    })
    const ref = useRef(null);
    const refclose = useRef(null);

    const handleclick = (e) => {
        e.preventDefault();
        editnote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Addnote />
            <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ display: "none" }}>
                MOdal
            </button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label" >Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>View Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitems key={note._id} updatenote={updatenote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
