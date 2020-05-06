import React, { Component } from 'react';
import setting from '../../assets/setting_1.png';
import elimina from '../../assets/delete_1.png';
import { CircularProgress } from "@material-ui/core";
import styles from './table.module.css'


const TableHeader = () => {
  return (
    <thead className={styles.tableHeader} >
      <tr className={styles.tr}>
        <th className={styles.th} >Cognome</th>
        <th className={styles.th} >Nome</th>
        <th className={styles.th} >Email</th>
        <th className={styles.th} >dettaglio</th>
        <th className={styles.th} >Elimina</th>
      </tr>
    </thead>
  );
}



class TableBody extends React.Component {
  render () {

    const { contacts } = this.props;
    const { loading } = this.props;

    console.log("TableBody - props.loading", loading);
    console.log("TableBody - props.contacts", contacts);
    if (loading && contacts.length > 0) {

      return contacts.map((contact, index) => {
        return (

          <tr key={index} >
            <td>{contact.first_name}</td>
            <td>{contact.last_name}</td>
            <td>{contact.email}</td>
            <td>
              <img src={setting} onClick={() => this.userdetails(contact)} />
            </td>
            <td>
              <img src={elimina} id={index} onClick={() => this.deleteUsers(contact.id)} />
            </td>
          </tr>
        )
      })
    } else if (loading && contacts.length === 0) {
      return <span>nessun Contatto</span>;
    } else {
      return (
        <div style={{ display: "flex", alignSelf: "center" }}>
          <CircularProgress />{" "}
        </div>
      );
    }
  }
}

class Table extends Component {
  render () {
    const { contacts } = this.props;
    const { loading } = this.props;

    return (
      <table className={styles.tableContainer}>
        <div>
          <TableHeader />
          <TableBody contacts={contacts} loading={loading} />
        </div>
      </table>
    )
  }
}

export default Table