import React, { useState } from "react";

import { Tab, Row, Col, Nav, Image } from "react-bootstrap";

import Detail from "./Detail";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";

const projects = [
  {
    id: 1,
    imagePath: "a",
    name: "Project 1",
    new: true
  },

  {
    id: 2,
    imagePath: "a",
    name: "Project 2",
    new: false
  },

  {
    id: 3,
    imagePath: "a",
    name: "Project 3",
    new: true
  }
];

const Dashboard = () => {
  const [activeTab, setTab] = useState();
  return (
    <div id="Dashboard">
      <Row>
        <Tab.Container id="left-tabs">
          <Col sm={3} className="left">
            <header>
              <h4 style={{ padding: "0 1rem" }}>
                <strong>ROGER</strong>
              </h4>
            </header>
            <hr />
            <Nav variant="pills" className="flex-column">
              {projects.map((proj, i) => (
                <Nav.Item key={i} onClick={() => setTab(proj.id)}>
                  <Nav.Link eventKey={proj.id}>
                    <Row>
                      <Col xs={2} style={{ textAlign: "center" }}>
                        <Image src={proj.imagePath} />
                      </Col>
                      <Col style={{ fontWeight: proj.new ? "bold" : "normal" }}>
                        {proj.name}
                      </Col>
                      <Col xs={2} style={{ textAlign: "center" }}>
                        {proj.new ? <FontAwesomeIcon icon={faCircle} size="sm" style={{color: 'red'}}/> : null}
                      </Col>
                    </Row>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          <Col sm={9} className="right">
            <Tab.Content>
              {projects.map((proj, i) => (
                <Tab.Pane eventKey={proj.id} key={i}>
                  {proj.id === activeTab ? <Detail proj={proj} /> : null}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Tab.Container>
      </Row>
    </div>
  );
};

export default Dashboard;
