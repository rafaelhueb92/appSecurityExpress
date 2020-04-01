import axios from "../utils/axios";

class DDOSAttack {
  constructor(baseUrl) {
    console.log("BaseUrl of Attack", baseUrl);
    this.client = axios(baseUrl);
  }

  async attack() {
    try {
      const { data, status } = await this.client.get("");
      console.log(data, status);
      return { status, data };
    } catch (ex) {
      if (ex.response) {
        const { status } = ex.response;
        return { status };
      }
      throw ex;
    }
  }
}

export default baseUrl => new DDOSAttack(baseUrl);
