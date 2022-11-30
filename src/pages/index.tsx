import type { NextPage } from "next";
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
} from "react-bootstrap";

import React from "react";

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const Home: NextPage = () => (
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
      <Card className="mb-4">
        <Card.Body>
          <div className="row">
            <div className="col-sm-6 col-lg-3">
              <h4>Client Stats</h4>
            </div>
            <div className="col-sm-6 col-lg-3"></div>
            <div className="col-sm-6 col-lg-3"></div>
          </div>
        </Card.Body>
      </Card>
    </Container>

    <Container>
      <div className="row">
        <div className="col-md-12">
          <Card className="mb-4">
            <Card.Header>Current Clients</Card.Header>
            {/* This card determines the user state, so is considered user profiles assigned to client*/}
            <Card.Body>
              <table className="table mb-0">
                <tbody>
                  <tr className="align-middle">
                    <td className="text-center">
                      <div className="avatar avatar-md d-inline-flex position-relative">
                        <Image
                          width={128}
                          height={128}
                          className="rounded-circle"
                          src="/assets/img/avatars/1.jpg"
                          alt="user@email.com"
                        />
                        <span className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white" />
                      </div>
                    </td>
                    <td>
                      <div>Sample User</div>
                      {/* User Profile Data*/}
                      <div className="small text-black-50">
                        <span>New</span> | Registered: Jan 1, 2023
                      </div>
                    </td>
                    <td>
                      <div className="small text-black-50">Last login</div>
                      <div className="fw-semibold">10 sec ago</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>

    <Container>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
    </Container>

    <br></br>

    <Container>
      <Card>
        <Card.Body>
          <h5>Meal Plans</h5>
        </Card.Body>
      </Card>
    </Container>
  </AdminLayout>
);

export default Home;
