import React from "react";
import Image from "next/image";
import { AdminLayout } from "@layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  Dropdown,
  Container,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Table
} from "react-bootstrap";

function MealCard ({meal}) {
    return (
        <Card body>
            <h3>{meal.name}</h3>
        </Card>
    )
}

const Client = () => {

  return (
    <AdminLayout>
      <Container>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand>Welcome Back "Person"</Navbar.Brand>
            <Nav className="ml-auto">
              <Button className="invite-button" href="#">
                Invite New Client
              </Button>
            </Nav>
          </Container>
        </Navbar>
      </Container>

      <Container>
        <Card style={{border: "none", marginTop: 10, marginBottom: 10}}>
          <Card.Header>Clients</Card.Header>
          <Card.Body>
          </Card.Body>
        </Card>
      </Container>
    </AdminLayout>
  )
};

export default Client;
