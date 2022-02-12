const fs = require("fs");
const yargs = require("yargs");

const title = yargs.argv.title;
const body = yargs.argv.body;
const command = yargs.argv._[0];

//bonus
const chalk = require("chalk");

const getNotes = () => {
    try {
        return JSON.parse(fs.readFileSync(`notes.json`));
    } catch (err) {
        return chalk.bgRed(`Couldn't get notes`);
    }
};

const addNote = (title, body) => {
    let notes = getNotes();

    let note = {
        title,
        body,
    };

    let duplicatedNote = notes.filter((note) => note.title === title);

    if (duplicatedNote.length === 0) {
        notes.push(note);

        fs.writeFileSync("notes.json", JSON.stringify(notes));

        console.log(chalk.bgGreen(`New note created!`));
    } else {
        console.log(chalk.bgRed(`Title already taken!`));
    }
};

const deleteNote = (title) => {
    let notes = getNotes();
    console.log(title);

    let filterNotes = notes.filter((note) => note.title !== title);
    fs.writeFileSync("notes.json", JSON.stringify(filterNotes));
    console.log(chalk.bgGreen(`Note removed!`));
};

const readNote = (title) => {
    let notes = getNotes();

    try {
        let filterNotes = notes.filter((note) => note.title === title);
        console.log(chalk.bgBlue(title));
        mynotes(filterNotes[0]);
    } catch {
        console.log(
            chalk.bgRed(
                `couldn't find note with that title \n Title is CASE SENSITIVE. \n make sure to type correctly`
            )
        );
    }
};

const listNotes = () => {
    let notes = getNotes();
    console.log(chalk.bgGray(`Your Notes:`));
    notes.forEach((note) => mynotes(note));
};

const mynotes = (note) => {
    console.log("--------------------------");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
    console.log("--------------------------");
};

if (command === `add`) {
    addNote(title, body);
} else if (command === `remove`) {
    deleteNote(title);
} else if (command === `read`) {
    readNote(title);
} else if (command === `list`) {
    listNotes();
} else {
    console.log(
        chalk.bgRed(`Command not PRESENT. USE \n add, remove, read, list`)
    );
}