import config from "./config.json";
import App from "../../App.js"
/**
 *
 */
class HttpLibrary {
  constructor(path, options, id) {
    this.url = `${config.url}/${path}`;
    this.options = (path || null) && (options || null);
    this.id = id;
    /*
     *
     */
    if (!this.options) {
      const error = {
        name: "Errore",
        message: "è necessario  un obj options o un path ",
      };
      throw error;
    }
  }
  /*
   * Get
   */
  getItem = () => {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: this.options.method,
      }).then((resp) => {
        if (resp.status === 200) {
          resp.json().then((data) => {
            console.log("HttpLibrary - getItem - then", data);
            resolve(data);
          });
        } else {
          reject(resp);
        }
      });
    });
  };
  /*
  * Post
  */
  postItem = () => {
    return new Promise((resolve, reject) => {
      fetch(this.url, {
        method: this.options.method,
        body: this.options.body,
        headers: config.headers,
      }).then((resp) => {
        if (resp.status === 201) {
          alert("Contatto creato!");
          resp.json().then((data) => {
            console.log("HttpLibrary - postItem - then", data);
            resolve(data);
          });
        } else {
          reject(resp);
        }
      });
    });
  };
  /*
  * Delete
  */
  deleteItem = () => {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/${this.id}`, {
        method: this.options.method,
        headers: config.headers,
      }).then((resp) => {
        if (resp.status === 200) {
          alert("Contatto eliminato!");
          resp.json().then((data) => {
            console.log("HttpLibrary - postItem - then", data);
            resolve(data);
          });
        } else {
          reject(resp);
        }
      });
    });
  };
  /*
   *Put
   */
  putItem = () => {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/${this.id}`, {
        method: this.options.method,
        body: this.options.body,
        headers: config.headers,
      }).then((resp) => {
        if (resp.status === 200) {
          alert("Contatto modificato!");
          resp.json().then((data) => {
            console.log("HttpLibrary - postItem - then", data);
            resolve(data);
          });
        } else {
          reject(resp);
        }
      });
    });
  };
}

export default HttpLibrary;
