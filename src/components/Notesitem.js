import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/Alert/alertContext';

function Notesitem(props) {
    // const note = props.note;
    const { note, updateNote } = props; // Destructuring
    const { deleteNote } = useContext(noteContext);
    const {showAlert} = useContext(alertContext);
    return (
        <div className="col-md-3">
            <div className="card my-3" style={{ width: " 18rem" }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => {
                            deleteNote(note._id);
                            showAlert("Deleted Successfully", "succuss")
                        }}></i>
                        <i className="fa-sharp fa-regular fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Notesitem
