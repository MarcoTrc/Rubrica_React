import React from "react";
import { Navbar } from "react-bootstrap";

const Footer: React.FC = (): JSX.Element => {
  return (
    <>
      <footer className="fixed-bottom">
        <Navbar bg="light" variant="light" expand="lg" fixed="bottom">
          <Navbar.Text className="ms-3 me-auto">
            Copyright © {new Date().getFullYear().toString()}
          </Navbar.Text>
          <Navbar.Text className="ms-auto me-3">Marco | Rubrica</Navbar.Text>
        </Navbar>
      </footer>
    </>
  );
};

export default Footer;
