const BASE_URL = process.env.VUE_APP_ROOT_API || 'https://daily-const-backend.vercel.app';

class ApiClient {
  async post(resource: string, body: object) {
    console.log(process.env.VUE_APP_ROOT_API);

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
