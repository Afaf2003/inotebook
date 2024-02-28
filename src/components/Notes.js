import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';
import AddNote from './AddNote';
import alertContext from '../context/Alert/alertContext';
import { useNavigate } from 'react-router-dom';


function Notes() {

    const { notes, getNote, editNote } = useContext(noteContext);// Destructuring
    const { showAlert } = useContext(alertContext);
    const navigate = useNavigate()
    // Fetching all the Notes
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote();
        }
        else{
            navigate('/login');
        }
    });


    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const ref = useRef(null);
    const refClose = useRef(null)


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log(`Note with ${note.id} is being Updated`);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        showAlert("Updated Successfully", "succuss")
        // addNote(note.title, note.description, note.tag);
        // setNote({title: "", description: "", tag: ""});

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Enter Title to Your Note</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Enter Descriptionto Your Note</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Enter Tag to Your Note</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h3>Your Notes</h3>
                <div className="container mx-3">
                    {notes.length === 0 && "No Notes to display"}
                </div>
                {notes.map((note) => {
                    // return note.title
                    return <Notesitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
