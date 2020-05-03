import React from "react";
import { InputLabel, Input, CircularProgress } from "@material-ui/core";
import details from '../../assets/details.png';


const API_URL = 'http://localhost:3001';
const url = `${API_URL}/users`;


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            id: '',
            contacts: [],
            loading: false

        }
    }

    /*
     * metodo che gestisce ogni campo del form , ne prende il valore
     */

    handlerField = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name
        this.setState({
            [name]: value,
        });
    }

    /*
     * metodo che inserisce lo stato dei valori nel campo form , in modo che poi li possiamo modificare
     */

    userdetails = (contact) => {
        const { first_name, last_name, email, id
        } = contact
        this.setState({ first_name, last_name, email, id })
    }

    /*
     * Chiamata GET
     */

    getUsers = () => {
        fetch(url, {
            method: 'GET'
        }).then(resp => {
            return resp.json()
        }).then(data => {
            console.log('App - getUsers', data)
            this.setState({ contacts: [...data], loading: true })
            console.log('App - getUsers - data')

        })
    }

    /*
     * Chiamata POST
     */

    onSubmit = (evt) => {
        console.log('App - onSubmit')
        const { first_name, last_name, email } = this.state;
        const contact = {
            first_name,
            last_name,
            email
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            if (resp.status === 201) {
                alert('Contatto creato!')
                this.getUsers()
            }
        }).catch(err => {
            alert(err)
        })
        evt.preventDefault()
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
        })
    }

    /*
    * Chiamata DELETE
     */

    deleteUsers = (id) => {
        const elm = `${url}/${id}`;
        console.log('App - deleteusers', id)
        fetch(elm, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(res => res.json(), console.log('deleteUsers url', `${url}/${elm}`))
            .then(res => console.log('deleteUsers res', res))
        this.getUsers()
    }

    /*
     * Chiamata PUT
     */

    updateContact = (e) => {
        console.log('App -  updateContact')
        e.preventDefault()
        const { first_name, last_name, email, id } = this.state;
        const contact = {
            first_name,
            last_name,
            email
        }
        const urlUpdate = `${url}/${id}`;
        fetch(urlUpdate, {
            method: 'PUT',
            body: JSON.stringify(contact),
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => {
            if (resp.status === 200) {
                alert('Contatto modificato!')
                this.getUsers()
            }
        }).catch(err => {
            alert(err)
        })

        this.setState({
            first_name: '',
            last_name: '',
            email: '',
        })
    }

    /*
    * Lyfe Cycle 
    */

    componentDidMount () {
        console.log('App -  componentDidMount', this.state)
        this.getUsers()
    }

    componentDidUpdate (prevProps, prevState) {
        console.log('App -  componentDidUpdate', this.state)
    }

    componentWillUnmount () {
        console.log('App - componentWillUnmount')
    }


    printBody = () => {
        const { contacts, loading, } = this.state

        if (loading && contacts.length > 0) {
            console.log('dentro primo if', contacts)
            return contacts.map((contact, index) => {
                return (
                    <tr key={index}>
                        <td>{contact.first_name}</td>
                        <td>{contact.last_name}</td>
                        <td>{contact.email}</td>
                        <td> <img src={details} onClick={() => this.userdetails(contact)} /></td>
                        <td><button id={index} onClick={() => this.deleteUsers(contact.id)}>X</button></td>
                    </tr>)
            })
        }
        else if (loading && contacts.length === 0) {
            return <span>nessun Contatto</span>
        }
        else { return <div style={{ display: 'flex', alignSelf: 'center' }}><CircularProgress /> </div> }
    }



    render () {
        const { first_name, last_name, email
        } = this.state;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '100px' }}>
                <div><form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={this.onSubmit}>
                    <h1>Inserisci Nuovo Utente</h1>
                    <div margin="normal" >
                        <InputLabel htmlFor="first_name">first_name</InputLabel>
                        <Input onChange={this.handlerField} name="first_name" type="text" value={first_name} />
                    </div>
                    <div margin="normal" >
                        <InputLabel htmlFor="last-name">last-name</InputLabel>
                        <Input onChange={this.handlerField} name="last_name" type="text" value={last_name} />
                    </div>
                    <div margin="normal">
                        <InputLabel htmlFor="email">email</InputLabel>
                        <Input onChange={this.handlerField} name="email" type="text" value={email} />
                    </div>
                    <input type="submit" color="primary" value="salva" size="medium" />
                    <button onClick={this.updateContact}>Aggiorna</button>
                </form>
                </div>
                <div>
                    <h1>tabella</h1>
                    <div>
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
                    </div>

                </div>
            </div>

        )



    }



}

export default App;

