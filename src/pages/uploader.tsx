import type { NextPage } from "next";
import React from "react";
import { AdminLayout } from "@layout";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

import { FileUpload } from "primereact/fileupload";

import { Button, ButtonGroup, Card, Container } from "react-bootstrap";

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const Home: NextPage = () => (
  <AdminLayout>
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <h4 className="mb-0">Content Uploader</h4>
            <div className="small text-black-50">January - July 2023</div>
          </div>
          <Container>
            <FileUpload name="uploader" url="/api/upload"></FileUpload>
          </Container>
        </div>
      </Card.Body>
    </Card>

    <div className="row">
      <div className="col-md-12"></div>
    </div>
  </AdminLayout>
);

export default Home;
