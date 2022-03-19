import React,{useContext} from 'react'
import contextvalue from '../context/notes/Notecontext'


const Noteitems = (props) => {
    const { note,updatenote } = props;
    const context = useContext(contextvalue);
    const { deletenote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>updatenote(note)}></i>
                    <i className="fa-regular fa-trash-can mx-3" onClick={()=>{deletenote(note._id)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
