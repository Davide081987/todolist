import config from "./config.json";
/**
 *
 */
class HttpLibrary {
  constructor(path, options) {
    this.url = `${config.url}/${path}`;
    this.options = (path || null) && (options || null);
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
   *
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
}
/*
 *
 */
export default HttpLibrary;
