const fs=require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath=path.join(__dirname, 'db.json')


async function addNote(title){
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)

   await fs.writeFile('./db.json',JSON.stringify(notes))
    console.log(chalk.bgGreen('Note was added'))
}
async function removeNote(removeId){
    const notes=await getNotes()
    const index=notes.findIndex(note=>note.id===removeId)
    console.log('index,',index)
    if (index>-1){
        notes.splice(index,1)
    }
    await fs.writeFile('./db.json', JSON.stringify(notes))
    console.log(chalk.green.inverse('Note was removed'))
}
async function getNotes(){
    const notes = await fs.readFile(notesPath, {encoding:'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}
async function printNote(){
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note =>{
        console.log(chalk.blue(note.title))
    })
}

module.exports = {
    addNote,printNote
}