import { useState } from 'react';
import NoteContext from './noteContext';


const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const noteInitial = []
    //Defineing Notes Collection
    const [notes, setNotes] = useState(noteInitial);

    const getNote = async () => {
        //Adding Fetch API call
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        // This is the response that we are getting from the backend while getting notes from DB
        const json = await response.json()
        setNotes(json)
    }

    //Add a Note
    const addNote = async (title, description, tag) => {
        //Adding Fetch API call
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });

        // console.log("Add Note Function is Running....")
        // This is the response that we are getting from the backend while Adding new notes to DB
        const note = await response.json()
        setNotes(notes.concat(note));
    }

    //delete a Note
    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes)
    }

    //edit a Note
    const editNote = async (id, title, description, tag) => {
        //Adding Fetch API call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);
        //Logic for Editing Note woth specific id
        for (let index = 0; index < notes.length; index++) {
            // const element = notes[index];
            if (notes[index]._id === id) {
                notes[index].title = title;
                notes[index].description = description;
                notes[index].tag = tag;
            }
        };
        setNotes(notes);
        // State can hold any kind of JavaScript value, including objects.But you shouldn't change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.
    }
    return (
        // <NoteContext.Provider value={{state, update}}>
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;