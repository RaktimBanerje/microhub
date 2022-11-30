import React, { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { AdminLayout } from "@layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Nav,
  Navbar,
  Form,
} from "react-bootstrap";

const FoodSearch = () => (
  <AdminLayout>
    <div className="row">
      <div className="col-md-12">
        <Card className="mb-4">
          <Card.Header>Searcher</Card.Header>
          <Card.Body>
            <Container>
              <Navbar bg="light" expand="lg">
                <Container fluid>
                  <Navbar.Brand>Testing Field</Navbar.Brand>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Container>
              </Navbar>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </div>
  </AdminLayout>
);

export default FoodSearch;
