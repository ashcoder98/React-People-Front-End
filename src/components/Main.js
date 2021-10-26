import { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [ people, setPeople ] = useState([]);

  const URL = "http://localhost:3001/people/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };
const updatePeople = async (person, id) => {
   await fetch(URL + id, {
     method: "PUT",
     headers: {'Content-type': 'Application/json'},
     body: JSON.stringify(person)
   });
   getPeople();
}
const deletePeople = async (id) => {
  await fetch(URL + id, {method: 'DELETE'});
  getPeople();
}

 // make sure we get people when the application loads
    // in other words, we need a side effect to occur as a result of the page loading
    // we will use the useEffect hook to have its effect function run on the page load
  useEffect(() => getPeople(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            people.length ?
            <Show
              {...rp}
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
            />
            :
            <Redirect to="/" />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;



 // make sure we get people when the application loads
    // in other words, we need a side effect to occur as a result of the page loading
    // we will use the useEffect hook to have its effect function run on the page load