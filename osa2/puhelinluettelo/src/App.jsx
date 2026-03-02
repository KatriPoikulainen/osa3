import { useState,useEffect } from 'react'
import noteService from './services/notes'

const Filter = (props) => (
  <div>
    filter shown with:{' '}
    <input
      value={props.filter}
      onChange={props.handleFilterChange}
        />
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
        <div>
          name:{' '}
          <input 
          value= {props.newName}
          onChange={props.handleNameChange}
          />
        </div>
        <div>
          number:{' '}
          <input 
          value= {props.newNumber}
          onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = (props) => (
  <ul>
    {props.personsToShow.map((person)=> (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ))}
</ul>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')

  useEffect(()=> {
    noteService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some((person) => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    noteService.create(personObject).then((response) => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

const handleFilterChange =(event) => setFilter(event.target.value)
const handleNameChange =(event) => setNewName(event.target.value)
const handleNumberChange =(event) => setNewNumber(event.target.value)

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

    <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
      addPerson={addPerson}
      newName= {newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )

}

export default App
