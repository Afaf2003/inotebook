import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/Alert/alertContext';


const AddNote = () => {
    const [note, setNote] = useState({title: "", description: "", tag: ""});
    const {addNote} = useContext(noteContext);
    const {showAlert} = useContext(alertContext);
    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        showAlert("Added New Note Successfully", "success")
    }
    const onChange = (e)=>{
        setNote({...note , [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Enter Title to Your Note</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Enter Descriptionto Your Note</label>
                        <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Enter Tag to Your Note</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                    </div>
                    <button disabled = {note.title.length < 5 ||note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
