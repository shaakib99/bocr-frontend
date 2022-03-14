import Navbar from "./navbar";
import Header from "./header";

import { ILayout } from "../../../interfaces/layout.interface";

const Layout = (props: ILayout) => {
  const showNavbar = props.showNavbar || true;

  return (
    <>
      <Header title={props.title} />
      {showNavbar && <Navbar />}
      {props.children}
    </>
  );
};
export default Layout;
