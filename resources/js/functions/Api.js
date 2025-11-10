export default class Api {
  constructor() {
    this.server = 'http://localhost:8000/api';
  }

  static async getItems(address) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:8000/api/${address}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            return resolve(data.data);
          }
        }
        return reject(xhr.responseText);
      });
      xhr.send();
    });
  }

  static async createItem(address, name) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('name', name);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `http://localhost:8000/api/${address}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = xhr.responseText;
            return resolve(data);
          }
        }
        return reject(xhr.responseText);
      });
      xhr.send(params);
    });
  }

  static async getShow(address, number) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:8000/api/${address}/${number}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            return resolve(data.data);
          }
        }
        return reject(xhr.responseText);
      });
      xhr.send();
    });
  }

  static async deleteItem(address, id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `http://localhost:8000/api/${address}/${id}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = xhr.responseText;
            return resolve(data);
          }
        }
        return reject(xhr.responseText);
      });
      xhr.send();
    });
  }

  static async updateSeats(address, id, array, row, seats) {
    const dataString = JSON.stringify(array);
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('status', dataString);
      params.append('row', row);
      params.append('seats', seats);
      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', `http://localhost:8000/api/${address}/${id}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        return reject(xhr.responseText);
      });
      xhr.send(params);
    });
  }

  static async userLogin(address, login, password) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('login', login);
      params.append('password', password);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `http://localhost:8000/api/${address}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        return reject(xhr.responseText);
      });
      xhr.send(params);
    });
  }

  static async updateHallPrice(address, id, price, vipPrice) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('price', price);
      params.append('vip_price', vipPrice);
      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', `http://localhost:8000/api/${address}/${id}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        return reject(xhr.responseText);
      });
      xhr.send(params);
    });
  }

  static async storeFilm(address, object, poster) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('name', object.name);
      formData.append('description', object.description);
      formData.append('duration', object.duration);
      formData.append('country', object.country);
      formData.append('poster', poster);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `http://localhost:8000/api/${address}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        return reject(xhr.responseText);
      });
      xhr.send(formData);
    });
  }

  static async storeTicket(address, object) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('show_id', object.movieShowId);
      const seats = JSON.stringify(object.seats);
      params.append('seats', seats);
      params.append('start_day', object.startDay);
      params.append('start_time', object.startTime);
      params.append('hall_name', object.hall);
      params.append('film', object.film);
      params.append('price', object.orderSum);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `http://localhost:8000/api/${address}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        return reject(xhr.responseText);
      });
      xhr.send(params);
    });
  }

  static async getMovie(address, date) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:8000/api/${address}/${date}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            if (data.data) {
              return resolve(data.data);
            }
            return resolve(data);
          }
        }
        return reject(xhr.responseText);
      });
      xhr.send();
    });
  }

  static async patchMovie(address, date, dataArray, deleted) {
    const dataString = JSON.stringify(dataArray);
    const deletedString = JSON.stringify(deleted);
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('dataArray', dataString);
      params.append('deleted', deletedString);
      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', `http://localhost:8000/api/${address}/${date}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        return reject(xhr.responseText);
      });
      xhr.send(params);
    });
  }

  static async openSales(address, status, id) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('status', status);
      const xhr = new XMLHttpRequest();
      xhr.open('PATCH', `http://localhost:8000/api/${address}/${id}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        return reject(xhr.responseText);
      });
      xhr.send(params);
    });
  }

  static async getQr(address, number) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `http://localhost:8000/api/${address}/${number}`);
      xhr.setRequestHeader('X-CSRF-TOKEN', window.csrfToken);
      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            return resolve(xhr.responseText);
          }
        }
        return reject(xhr.responseText);
      });
      xhr.send();
    });
  }
}
