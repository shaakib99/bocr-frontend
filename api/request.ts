import axios from "axios";

export class Request {
  public controler = new AbortController();
  public prefix =" http://127.0.0.1:8000/api/1/"
  

  private getCookieByName = (name: string) => {
    if (typeof window !== "undefined")
      return document.cookie
        .match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")
        ?.pop();

    return undefined;
  };

  reqClient = axios.create({
    signal: this.controler.signal,
    baseURL: this.prefix,
    timeout: 15000,
    headers: {
      Authorization: this.getCookieByName("token") || "",
      "content-type": "application/json",
    },
  });
}
