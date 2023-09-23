  // Check if the person with the same name already exists in the phonebook
  const existingPerson = persons.find((person) => person.name === newName);

  if (existingPerson) {
    // If the person exists, ask the user to confirm the update
    const confirmMessage = `${newName} is already added to the phonebook. Replace the old number with the new one?`;

    if (window.confirm(confirmMessage)) {
      const updatedPerson = {
        ...existingPerson,
        number: newNumber,
      };

      // Make an HTTP PUT request to update the phone number
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
        })
        .catch((error) => {
          console.error("Error updating person:", error);
        });
    }
  } 