import { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ searchName, handleSearchNameChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchName} onChange={handleSearchNameChange} />
    </div>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };
    axios.get("http://localhost:3001/persons").then(eventHandler);
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleSearchNameChange = (event) => {
    console.log(event.target.value);
    setSearchName(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const personsToShow = searchName ? filteredPersons : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchName={searchName}
        handleSearchNameChange={handleSearchNameChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
