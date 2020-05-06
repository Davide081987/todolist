import React from "react";
import { InputLabel, Input, CircularProgress, Button } from "@material-ui/core";
import details from "../../assets/details.png";
import HttpLibrary from "../../components/HttpLibrary";
import Table from '../../components/Table/';
import Form from '../../components/Form/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      id: "",
      buttonValue: "Inserisci Utente",
      mostraForm: null,
      change: false,
      contacts: [],
      loading: false,
    };
  }
  /*
   * Chiamata GET
   */
  getUsers = async () => {
    try {
      const http = new HttpLibrary("users", { method: "get" });
      http.getItem()
        .then((resp) => {
          this.setState({ contacts: [...resp], loading: true });
        })
        .catch((err) => {
          console.log(err.status);
        });
    } catch (err) {
      console.log(err);
    }
  };
  /*
   * Chiamata POST
   */
  onSubmit = async (evt) => {
    console.log("App - onSubmit");
    const { first_name, last_name, email } = this.state;
    const contact = { first_name, last_name, email, };
    try {
      const http = new HttpLibrary("users", {
        method: "POST",
        body: JSON.stringify(contact),
      });
      http.postItem()
        .then((resp) => {
        })
        .catch((err) => {
          console.log(err.status);
        });
    } catch (err) {
      console.log(err);
    }
    this.getUsers();
    evt.preventDefault();
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
    });
  };
  /*
   * Chiamata DELETE
   */
  deleteUsers = async (id) => {
    try {
      const http = new HttpLibrary("users", {
        method: "DELETE",
      },
        `${id}`
      );
      http.deleteItem()
        .then((resp) => {
        })
        .catch((err) => {
          console.log(err.status);
        });
    } catch (err) {
      console.log(err);
    }
    this.getUsers();
  };
  /*
   * Chiamata PUT
   */
  updateContact = async (e) => {
    console.log("App -  updateContact");
    e.preventDefault();
    const { first_name, last_name, email, id } = this.state;
    const contact = { first_name, last_name, email, };
    try {
      const http = new HttpLibrary("users", {
        method: "PUT",
        body: JSON.stringify(contact),
      },
        `${id}`
      );
      http.putItem()()
        .then((resp) => {
        })
        .catch((err) => {
          console.log(err.status);
        });
    } catch (err) {
      console.log(err);
    }
    this.getUsers()
    e.preventDefault();
    this.setState({
      first_name: "",
      last_name: "",
      email: "",
    });
  };
  /*
   * metodo che gestisce ogni campo del form , ne prende il valore
   */
  handlerField = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  /*
   * metodo che inserisce lo stato dei valori nel campo form , in modo che poi li possiamo modificare
   */
  userdetails = (contact) => {
    const { first_name, last_name, email, id } = contact;
    this.setState({ first_name, last_name, email, id });
  };
  /*
   * Lyfe Cycle
   */
  componentDidMount () {
    console.log("App -  componentDidMount", this.state);
    this.getUsers();
  }

  componentDidUpdate (prevProps, prevState) {
    console.log("App -  componentDidUpdate", this.state);
  }

  componentWillUnmount () {
    console.log("App - componentWillUnmount");
  }



  /*
  printBody = () => {
    const { contacts, loading } = this.state;

    if (loading && contacts.length > 0) {
      return contacts.map((contact, index) => {
        return (
          <tr key={index}>
            <td>{contact.first_name}</td>
            <td>{contact.last_name}</td>
            <td>{contact.email}</td>
            <td>
              {" "}
              <img src={details} onClick={() => this.userdetails(contact)} />
            </td>
            <td>
              <button id={index} onClick={() => this.deleteUsers(contact.id)}>
                X
                </button>
            </td>
          </tr>
        );
      });
    } else if (loading && contacts.length === 0) {
      return <span>nessun Contatto</span>;
    } else {
      return (
        <div style={{ display: "flex", alignSelf: "center" }}>
          <CircularProgress />{" "}
        </div>
      );
    }
  };
*/




  changeButton = () => {
    const buttonValue = this.state.change ? 'inserisci Utente' : 'ridimensiona';
    const mostraForm = this.state.change ? '' : <Form />;

    this.setState({
      buttonValue: buttonValue,
      mostraForm: mostraForm,
      change: !this.state.change
    });
  }





  render () {
    const { first_name, last_name, email, contacts, loading, userdetails } = this.state;

    console.log("Render - loading", loading);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "100px",
        }}
      >

        <Table contacts={contacts} loading={loading} userdetails={userdetails} />


        <Button style={{ backgroundColor: 'lightBlue' }} onClick={() => this.changeButton()} >
          {this.state.buttonValue}
        </Button>

        <div>
          {this.state.mostraForm}
        </div>



        <div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={this.onSubmit}
          >
            <h1>Inserisci Nuovo Utente</h1>
            <div margin="normal">
              <InputLabel htmlFor="first_name">first_name</InputLabel>
              <Input
                onChange={this.handlerField}
                name="first_name"
                type="text"
                value={first_name}
              />
            </div>
            <div margin="normal">
              <InputLabel htmlFor="last-name">last-name</InputLabel>
              <Input
                onChange={this.handlerField}
                name="last_name"
                type="text"
                value={last_name}
              />
            </div>
            <div margin="normal">
              <InputLabel htmlFor="email">email</InputLabel>
              <Input
                onChange={this.handlerField}
                name="email"
                type="text"
                value={email}
              />
            </div>
            <input type="submit" color="primary" value="salva" size="medium" />
            <button onClick={this.updateContact}>Aggiorna</button>
          </form>
        </div>









        {/*
      
        <table>
          <thead>
            <tr>
              <th>Cognome</th>
              <th>Nome</th>
              <th>Email</th>
              <th>dettaglio</th>
              <th>Elimina</th>
            </tr>
          </thead>
          {this.printBody()}
        </table>
*/}

      </div >
    );
  }
}

export default App;
