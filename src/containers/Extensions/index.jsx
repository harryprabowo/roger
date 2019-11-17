import React, { useState } from "react";

import { Row, Col, Tab, Card, Nav } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPuzzlePiece
} from "@fortawesome/free-solid-svg-icons";

import "./style.scss";

const categories = [
  {
    id: 1,
    name: "Productivity",
    extensions: ["Worker Attendance", "Task Management Integrator", "Scheduled Announcement"]
  },

  {
    id: 2,
    name: "Warehouse & Inventory",
    extensions: ["Warehouse Monitoring", "Ask for Material", "Automatic Resupply"]
  },

  {
    id: 3,
    name: "Safety & Emergency",
    extensions: ["Damkar", "Police"]
  },

  {
    id: 4,
    name: "Transportation",
    extensions: ["Transportation Request", "Heavy Transportation Request", "Shipment Status"]
  },

  {
    id: 5,
    name: "Security & Ronda",
    extensions: ["Security Alert", "CCTV Integration Tool"]
  }
];

const Extensions = () => {
  const [activeTab, setTab] = useState(1);

  return (
    <div id="Extensions">
      <Row>
        <Tab.Container id="left-tabs" defaultActiveKey={1}>
          <Col sm={2} className="left">
            <header>
              <h5 style={{ padding: "0 .5rem" }}>Extensions</h5>
            </header>
            <hr />
            <Nav variant="pills" className="flex-column">
              {categories.map((cat, i) => (
                <Nav.Item key={i} onClick={() => setTab(cat.id)}>
                  <Nav.Link eventKey={cat.id}>
                    <span style={{ fontSize: "10pt" }}>{cat.name}</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9} className="right">
            <Tab.Content>
              {categories.map((cat, i) => (
                <Tab.Pane eventKey={cat.id} key={i}>
                  <div style={{ display: "flex" }}>
                    {cat.extensions.map((ext, j) => (
                      <Card
                        key={j}
                        variant="light"
                        style={{
                          width: "10rem",
                          textAlign: "center",
                          margin: "1rem"
                        }}
                      >
                        <Card.Header>
                          <FontAwesomeIcon icon={faPuzzlePiece} size="2x" />
                        </Card.Header>
                        <Card.Body>
                          <Card.Title></Card.Title>
                          <Card.Text>{ext}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Tab.Container>
      </Row>
    </div>
  );
};

export default Extensions;
