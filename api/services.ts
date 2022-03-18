import { Request } from "./request";

export class ImageRecognitionSerivces extends Request {
  private recognitionURL = "/image/recognition";

  public recognizeImage(data: FormData) {    
    return this.reqClient.put(this.recognitionURL, data);
  }
}
