const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
