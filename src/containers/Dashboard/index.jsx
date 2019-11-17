import React, { useState } from "react";

import { Tab, Row, Col, Nav, Button } from "react-bootstrap";

import Detail from "./Detail";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCaretDown,
  faHardHat
} from "@fortawesome/free-solid-svg-icons";

import "./style.scss";

const projects = [
  {
    id: 1,
    name: "Project 1",
    new: true
  },

  {
    id: 2,
    name: "Project 2",
    new: false
  },

  {
    id: 3,
    name: "Project 3",
    new: true
  }
];

const Dashboard = () => {
  const [activeTab, setTab] = useState(1);
  return (
    <div id="Dashboard">
      <Row>
        <Tab.Container id="left-tabs" defaultActiveKey={1}>
          <Col sm={3} className="left">
            <header style={{ padding: "0 1rem" }}>
              <h4 style={{ margin: 0 }}>
                <strong>ROGER</strong>
                <Button variant="link">
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{
                      verticalAlign: "text-top",
                      color: "white",
                      fontSize: "14pt",
                      opacity: 0.8
                    }}
                  />
                </Button>
              </h4>
              <span style={{ fontSize: "10pt" }}>
                <FontAwesomeIcon
                  icon={faCircle}
                  style={{ color: "green" }}
                  size="sm"
                />
                <label style={{ marginLeft: "1rem", opacity: 0.8 }}>
                  BUSINESS HOURS
                </label>
              </span>
            </header>
            <hr />
            <Nav variant="pills" className="flex-column">
              {projects.map((proj, i) => (
                <Nav.Item key={i} onClick={() => setTab(proj.id)}>
                  <Nav.Link eventKey={proj.id}>
                    <Row>
                      <Col xs={2} style={{ textAlign: "center" }}>
                        <FontAwesomeIcon
                          icon={faHardHat}
                          style={{ color: "#E5B829" }}
                        />
                      </Col>
                      <Col style={{ fontWeight: proj.new ? "bold" : "normal" }}>
                        {proj.name}
                      </Col>
                      <Col xs={2} style={{ textAlign: "center" }}>
                        {proj.new ? (
                          <FontAwesomeIcon
                            icon={faCircle}
                            size="sm"
                            style={{ color: "red" }}
                          />
                        ) : null}
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
