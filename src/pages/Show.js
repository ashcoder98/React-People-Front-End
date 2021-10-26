import { useState } from 'react';


const Show = (props) => {
    const id = props.match.params.id;
    const people = props.people;
    const person = people.find((p) => p._id === id);
    // state for form 
    const [editForm, setEditForm] = useState(person);

    // handleChange function for form
    const handleChange = (event) => {
        setEditForm((prevState)=> ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }
    // handleSubmit for form
    const handleSubmit = (event) => {
        event.preventDefault();
        props.updatePeople(editForm, person._id);
        // redirect people back to index
        props.history.push("/")
    };
    const removePerson = ()=> {
        props.deletePeople(person._id);
        props.history.push("/");
    };
    return (
      <div className="person">


          <h1>{person.name}</h1>
          <h3>{person.title}</h3>
          <img src={person.img} alt={person.name} />
         <button id="delete" onClick={removePerson}>DELETE
             </button>
          <form onSubmit={handleSubmit}>
     <input name="name" onChange={handleChange} value={editForm.name} type="text" />
     <input name="image" onChange={handleChange} value={editForm.image} type="text" />
     <input name="title" onChange={handleChange} value={editForm.title} type="text" />
     <input value="Update Person" type="submit" />
    
          </form>
      </div>



    );
}
export default Show;