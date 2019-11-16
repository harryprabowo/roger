import React, { useState } from "react";

import { Form, FormControl, Row, Col, Image, Button } from "react-bootstrap";

import "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faCog } from "@fortawesome/free-solid-svg-icons";

import { isNullOrUndefined } from "util";

const commands = [
  [
    {
      title: "Emergency",
      imagePath: "a",
      list: ["Call an ambulance", "Ask for emergency details"]
    },
    {
      title: "Reminders",
      imagePath: "a",
      list: []
    }
  ]
];

const CommandCard = props => {
  const { cmd } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className="card">
      <Row>
        <Col xs={1}>
          <Image src={cmd.imagePath} />
        </Col>
        <Col>
          <strong>{cmd.title}</strong>
          <Button size="sm" variant="link">
            <FontAwesomeIcon icon={faCog} style={{ color: "grey" }} />
          </Button>
        </Col>
        <Col
          xs={1}
          onClick={() => setOpen(!open)}
          style={{ color: "lightgrey", cursor: "pointer" }}
        >
          {open ? (
            <FontAwesomeIcon
              icon={faChevronUp}
              style={{ verticalAlign: "middle" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ verticalAlign: "middle" }}
            />
          )}
        </Col>
      </Row>
      {open ? (
        <>
          <br />

          <ul>
            {cmd.list.map((list, i) => (
              <li key={i}>{list}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

const Detail = props => {
  const { proj } = props;

  return (
    <div id="Detail">
      <Row>
        <Col className="command-list">
          <Form>
            <FormControl type="text" placeholder="Search" />
          </Form>

          <hr />

          {isNullOrUndefined(commands[proj.id - 1])
            ? null
            : commands[proj.id - 1].map((cmd, i) => (
                <CommandCard key={i} cmd={cmd} />
              ))}
        </Col>
        <Col md={4} className="message-log"></Col>
      </Row>
    </div>
  );
};

export default Detail;
