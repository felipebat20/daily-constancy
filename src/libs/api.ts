class ApiClient {
  private base_url;

  constructor() {
    this.base_url = process.env.VUE_APP_ROOT_API;
  }

  async post(resource: string, body: object) {
    const url = new URL(resource, this.base_url);

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
