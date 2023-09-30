
const BASE_URL = 'https://daily-const-backend.vercel.app';

class ApiClient {
  // constructor(parameters) {

  // }

  // async get() {

  // }

  async post(resource: string, body: object) {
    const url = new URL(resource, BASE_URL);

    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body),
      });

      if (response.json) {
        return response.json();
      }
    } catch (err) {
      return err;
    }
  }
}

export const api = new ApiClient();
