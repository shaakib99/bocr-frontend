import { IHeader } from "./header.interface";

export interface ILayout extends IHeader {
  children: React.ReactElement;
  showNavbar?: boolean;
}
