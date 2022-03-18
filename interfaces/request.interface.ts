export interface IRequest {
  url: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"  ;
  data?: object;
  params?: object
}
