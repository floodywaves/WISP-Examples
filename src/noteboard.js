import React, { useEffect, useState } from 'react';
import './App.css';
import Note2 from './note';
import {addNewNotes,deleteNote,updateNote,getAllNotes} from './services:/datastore';

// functional component version of NoteBoard

const NoteBoard2 = (props) => {
    const [notes, setNotes] = useState([]); // this needs to go in database
    const [noteID, setNoteID] = useState(0);
    const [newNoteName, setNewNoteName] = useState('');
    const [newNoteText, setNewNoteText] = useState('');
   
    const newNoteNameFunction = (event) => {
        setNewNoteName(event.target.value);
    }

    const newNoteTextFunction = (event) => {
        setNewNoteText(event.target.value);
    }
    //useEffect rerun when you wanted to 
    //use a boolea to let it run, if nothing them it will immediately run
    //whenever anything changes, new connection would be made
    //dependency array
    useEffect(()=>{
      getAllNotes((note_list)=>
        {setNotes(note_list)})
    });



    const saveNoteInfo = () => {
        // OLD
        //setNotes([...notes, { id: noteID, name: newNoteName, text: newNoteText }]);

        //NEW
        addNewNotes(noteID, newNoteName,newNoteText); // instead of adding to state, will add to server database
        
        setNoteID((i) => i + 1); // maintain a running note ID

    }

    // callback function
    //delNote name need to be different from function name in database
    const delNote  = (id) => {
        //OLD
        //setNotes(notes.filter((i) => i.id !== id));
        //NEW
        deleteNote(id);

    }

    //callback function to change name and text of specific note
    const editNote = (id, newName, newText) => {
      //OLD

        // JS concept of IMMUTABILITY: need to create a copy of the array and set that as the 
        // new note state, can't "mutate" the old state array in place!
        // const newNotes = notes.map((note, i) => {
        //     if (i === id) {
        //       // if matches the ID in question, modify the note!
        //       return {id: id, name: newName, text: newText};
        //     } else {
        //       // The rest haven't changed
        //       return note;
        //     }
        //   });

          // finally, set the state to the new array with modified note!
          //        setNotes(newNotes);

        //NEW
        updateNote(id,newName,newText);
  
    
    }

    let allNotes = '';
    if (notes!=null){ // render
      allNotes = Object.entries(notes).map(([id,note]) => {
    
        return (
            <Note2
                name={note.name}
                text={note.text}
                id={note.id}
                key={note.id}
                delete={delNote} // passing callback function!
                edit={editNote}
            />
            );
      
      })
    
    }

   return (
     <div>
       <p> this is the a note board! </p>
       <p>add a new note below!</p>
       <p>enter title:</p>
        <input type="text" value={newNoteName} onChange={newNoteNameFunction} />

        <p>enter text:</p>
        <input type="text" value={newNoteText} onChange={newNoteTextFunction} />
       <button onClick={saveNoteInfo}>Save!</button>

        <div className="notes-flex">
          {allNotes}
        </div>
       

     </div>
   );
 }

export default NoteBoard2;