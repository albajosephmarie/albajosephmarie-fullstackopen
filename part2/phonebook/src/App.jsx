import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const eventHandler = (response) => {
      setPersons(response.data);
    };
    personService.getAll().then(eventHandler);
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmMessage = `${newName} is already added to the phonebook. Replace the old number with the new one?`;

      if (window.confirm(confirmMessage)) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber,
        };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            // Update the state with the updated person
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? response.data : person
              )
            );
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Person '${newName}' updated successfully!`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000); // Display success message for 5 seconds
          })
          .catch((error) => {
            setErrorMessage(`Failed to update Person '${newName}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          // Inside the function where you add a new person or change a number
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Person '${newName}' added successfully!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000); // Display success message for 5 seconds
        })
        .catch((error) => {
          setErrorMessage(`Failed to add Person '${newName}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
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

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmMessage = `Delete ${personToDelete.name}?`;

    if (window.confirm(confirmMessage)) {
      // Make an HTTP DELETE request to delete the person from the backend
      personService
        .remove(id)
        .then(() => {
          // Update the state by removing the deleted person
          setPersons(persons.filter((person) => person.id !== id));
          setSucessMessage(`Deleted person successfully!`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          // Handle any error that occurs during deletion
          setErrorMessage(`Failed to delete Person`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />
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
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
