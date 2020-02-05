/**
 * EasyHTTP Library (with Async and Await)
 * Library for making HTTP requests
 * @Version 3.0.0
 * @author Ådne Karstad
 */

class EasyHTTP {
  // Make a HTTP GET Request
  async get(url) {
    const response = await fetch(url);

    const resData = await response.json();
    return resData;
  }

  // Make a HTTP POST Request
  async post(url, data) {
    const response = await fetch(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    const resData = await response.json();
    return resData;
  }

  // Make an HTTP PUT Request
  async put(url, data) {
    const response = await fetch(
      url,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    const resData = await response.json();
    return resData;
  }

  // Make an HTTP DELETE Request
  async delete(url) {
    const response = await fetch(
      url,
      {method: 'DELETE'}
    );

    const resData = await 'Resource Deleted...';
    return resData;
  }


 }