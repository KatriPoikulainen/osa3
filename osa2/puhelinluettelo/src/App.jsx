import { useState,useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with:{' '}
    <input value={filter} onChange={handleFilterChange} />
  </div>
)

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <form onSubmit={addPerson}>
        <div>
          name:{' '}
          <input 
          value= {newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number:{' '}
          <input 
          value= {newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = ({ personsToShow, deletePerson }) => (
  <ul>
    {personsToShow.map((person)=> (
      <li key={person.id}>
        {person.name} {person.number}{' '}
        <button onClick={() => deletePerson(person.id)}>
          delete
        </button>
      </li>
    ))}
</ul>
)


const App = () => {

const [persons, setPersons] = useState([])
const [filter, setFilter] = useState('')
const [newName, setNewName] = useState('')
const [newNumber, setNewNumber] = useState ('')

const [notification, setNotification] = useState({message: null, type: null})

const showNotification = (message, type) => {
  setNotification({ message, type })
  setTimeout(() => {
    setNotification({ message: null, type: null })
  }, 5000)
}

  useEffect(()=> {
    noteService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNumber.trim()

      if (name === '' || number === '') {
      showNotification('Name and number must not be empty', 'error')
      return
    }

    const existingPerson = persons.find((p)=> p.name === name)

if (existingPerson) {
  const ok = window.confirm(
    `${name} is already added to phonebook, replace the old number with a new one?`
  )
  if (!ok) return

  const updatedPerson = { ...existingPerson, number }

  noteService
    .update(existingPerson.id, updatedPerson)
    .then((updated) => {
      setPersons(
        persons.map((p) => (p.id !== existingPerson.id ? p : updated))
      )
      setNewName('')
      setNewNumber('')
      showNotification(`Updated ${updated.name}`, 'success')
    })
    .catch(() => {
      showNotification(
        `Information of '${existingPerson.name}' was already removed from server`,
        'error'
      )
      setPersons(persons.filter((p) => p.id !== existingPerson.id))
    })

  return
}


    const personObject = {
      name: name,
      number: number
    }


    noteService
    .create(personObject)
    .then((createdPerson) => {
      setPersons(persons.concat(createdPerson))
      setNewName('')
      setNewNumber('')
        showNotification(`Added ${createdPerson.name}`, 'success')
      })
      .catch((error) => {
        showNotification('Adding a person failed', 'error')
      })
  }


      
  const deletePerson = (id) => {
  const person = persons.find((p) => p.id === id)
  if (!person) return

  const ok = window.confirm(`Delete ${person.name}?`)
  if (!ok) return

  noteService
    .remove(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id))
        showNotification(`Deleted ${person.name}`, 'success')
      })
      .catch((error) => {
        showNotification(
          `Information of '${person.name}' was already removed from server`,
          'error'
        )
        setPersons(persons.filter((p) => p.id !== id))
      })
  }

const handleFilterChange =(event) => setFilter(event.target.value)
const handleNameChange =(event) => setNewName(event.target.value)
const handleNumberChange =(event) => setNewNumber(event.target.value)

  console.log(persons)

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification.message}
      type={notification.type}/>

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
      <Persons personsToShow={personsToShow}
      deletePerson={deletePerson}/>
    </div>
  )

}

export default App
