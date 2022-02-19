const yargs = require('yargs')

const {addNote,removeNote, printNote} = require('./notes.controller.js')

yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    builder: {
        title:{
            type:'string',
            describe:'Note title',
            demandOption: true
        }
    },
    handler({title}) {
        addNote(title)
    }
})
yargs.command({
    command:"remove",
    describe:'remove note from list',
    builder:{
        id:{
            type:'string',
            describe:'Note id',
            demandOption:true
        }
    },
    async handler({id}){
        await removeNote(id)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        printNote()
    }
})

yargs.parse()