/* getting the note of html*/
const notesContainer = document.getElementById("app");
/* referencing the button to add the new notes */
const addNoteButton = notesContainer.querySelector(".add-note");

/*
now that function work we are going to display/create each note
that was in local storage and create a element for it and show
it on the page
*/
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    //basically insert the note Elements before the add Noe Button
    notesContainer.insertBefore(noteElement, addNoteButton);
});
/*
now that fucntions work we can just add a event listener to 
when add button is clicked and call the add note function */

//note: syntax has to be () => addNote()
addNoteButton.addEventListener("click", () => addNote());

/* This fucntion is going to go get all the notes 
from the user local storage in the brower. We are going 
to return an array of notes. Javascript array of javacript
objects.*/
//we are also doing so by doing using local storage API calls
function getNotes() {

    /*
    - This right here is going to attempt get all the sticky notes or
    if it the first time just an empty array
    - JSON. parse turns that JSON string into a native javascript array
    which gives us our list of notes
    */
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

}
/*Takes in an array of notes, and then save new notes
to the local storage in user broswer */
function saveNotes(notes){
    /*
    - We going to populate the local storage array of "stickynotes-notes"
    with some data
    - saves it as "stickynotes-notes"
    - turns the javascript array to a JSON string by using stringify 
     */
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}
/*Going to allows us to create a new note element, to
represent a note. Basically creating a new html elemnt 
for this */
function createNoteElement(id, content){
    /* We are going to create a new text area to represent
    a single sticky note*/

    //we are creatign teh new element, by creating a new textarea
    //element is a javascript represention of new html element textarea
    //yet to be appended to the doc as well
    const element = document.createElement("textarea");

    //will add class to the element so it can follow those css rules 
    element.classList.add("note");
    //the text of the sticky note is going to be content we pass in
    element.value = content;
    //what is will display if content not there
    element.placeholder = "Empty Sticky Note";

    //now we need to add some EventListener to trigger some functions

    //first if it value changes will update note, by calling that function
    element.addEventListener("change", () =>{
        updateNote(id, element.value);
    });
    //second if we double click we are going to delete note, by callign that function
    element.addEventListener("dblclick", () => {
        //double checks with user to see if we really wanted to delete the note, 
        //doDelete will contain true if so and false otherwise
        const doDelete = confirm("Are you sure you wish to delete this sticky note?");

        if(doDelete){
            deleteNote(id, element);
        }

    });
    return element;
}
/*Adding a new note to the html and save it to the 
local storage as well*/
function addNote(){

    //step one, get reference to all existing notes in local storage
    //we do this because need to add it to array and then resave array
    const notes = getNotes();
    //step two, we get random id and blank content
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    //step three, creating html object
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    //step four, makign sure we add new note before the add note button
    notesContainer.insertBefore(noteElement, addNoteButton);

    //step five, add new nodes to array
    notes.push(noteObject);
    //step six, resave the array to local storage with updated content
    saveNotes(notes);
}

/*Allows user to update notes, and id is just to 
be able to unique idenfity each different individual 
note*/
function updateNote(id, newContent) {
    //getting that array of notes again
    const notes = getNotes();

    //gettting the target note user is trying to update
    /*filter() method, allows us to give a give somethinh we looking
    for in order to find it in the array, and in this class we going to
    get the id and also pay attention to sytax in this case as well*/
    const targetNote = notes.filter(note => note.id == id)[0];

    //now that we have it just update the content
    targetNote.content = newContent;
    //finally resave the array
    saveNotes(notes);
}
/* We are going to need that id to be able to unique idenfity
and also the specific html element of that actually note*/
function deleteNote(id, element){
    //we are going to be getting all the notes that do not match
    //the same id
    const notes = getNotes().filter(note => note.id != id);

    //resaving the notes in local storage without the note we wanted
    //to delete
    saveNotes(notes);

    //this phyiscally removes the note from the page
    //and html code
    notesContainer.removeChild(element);
}


/* 
NOTES of just to keep in mind....

    What is local storage: 
        Allows us to store data in key: value pairs as strings.

        Note: 
            For our specific app, and it will hold an array of json.
            Then each note will have a id and have it's content connected
            to it. 

    Testing: 
        To test we can use dev tools and go access the console. 
        We can then proceed to call the javascript functions just to 
        make sure they are returning the correcting things. As well
        we can manually change local storage for testing proposes.

        We can also console.log testing, just to check that certian
        functions are being called when we want them too.
    
*/

