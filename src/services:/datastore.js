// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase,ref,set,update,remove, onValue} from "firebase/database"; // added line

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeUQUvZT7wLu40FyZL5r-44lcMcKK0MHI",
  authDomain: "todolist-b125e.firebaseapp.com",
  databaseURL: "https://todolist-b125e-default-rtdb.firebaseio.com",
  projectId: "todolist-b125e",
  storageBucket: "todolist-b125e.appspot.com",
  messagingSenderId: "653689708474",
  appId: "1:653689708474:web:3d33789633ace66be2c783",
  measurementId: "G-RSS88ESDXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

//gets all the notes in database, 3 attributes id, name, and notes
export function getAllNotes(callback = ()=>{}){
    const noteRef = ref(db,"notesApp/");
    onValue(noteRef,(snapshop)=> {
        const notes = snapshop.val(); // just looking at what is in data at time of request
        callback(notes)
    })

}
export function addNewNotes(noteId,noteName,noteText){
    set(ref(db,'notesApp/' + noteId),{ // at that specific note cluster, add that ID
        name: noteName,
        text: noteText,
    });
}

export function deleteNote(id){
    remove(ref(db,'notesApp/' + id)) // delete that specific ID when it is called 
}

export function updateNote(noteId, newName, newText){
    update(ref(db,'notesApp/'+noteId),{ //give them the attributes and firebase will take care of the modifications 
        note:newName,
        text: newText,
    });
}

