import React, { useState, useEffect } from "react";

import { Form, FormControl, Row, Col, Image, Button } from "react-bootstrap";

import "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faPlus,
  faArrowLeft,
  faAmbulance,
  faTasks,
  faEdit,
  faBell
} from "@fortawesome/free-solid-svg-icons";

import { isNullOrUndefined } from "util";

const apiURL = 'http://localhost:5000/api/chats';
const commands = [
  [
    {
      name: "emergency",
      title: "Emergency",
      icon: faAmbulance,
      list: ["Call an ambulance", "Forecast hazard"]
    },

    {
      name: "report",
      title: "Progress Report",
      icon: faTasks,
      list: []
    },

    {
      name: "announcement",
      title: "Announcement",
      icon: faBell,
      list: []
    }
  ]
];

const chatRes = [
  {
    category: "emergency",
    date_time: "23:38",
    from_roger: false,
    message: "Hai Roger situasi darurat tolong"
  },
  {
    category: "log",
    date_time: "23:46",
    from_roger: true,
    message: "Hai Roger ke air raja"
  },
  {
    category: "log",
    date_time: "23:46",
    from_roger: false,
    message: " Hai rojer ada pendarahan di sektor 5 darurat"
  }
];

const CommandCard = props => {
  const { cmd, selectCategory } = props;

  const [open, setOpen] = useState(false);

  return (
    <div
      className={"card " + (open ? " card-open" : "")}
      onClick={() => selectCategory(cmd.name)}
    >
      <Row>
        <Col xs={1} style={{ textAlign: "right" }}>
          <FontAwesomeIcon
            icon={cmd.icon}
            size="lg"
            style={{ color: "#333E50" }}
          />
        </Col>
        <Col>
          <strong style={{ marginRight: "1rem" }}>{cmd.title}</strong>
          <Button variant="link" style={{ padding: 0, verticalAlign: 'baseline' }} onClick={() => console.log('asdads')}>
            <FontAwesomeIcon icon={faEdit} style={{ color: "#aaa" }} size="lg" />
          </Button>
        </Col>
        <Col
          xs={1}
          onClick={() => setOpen(!open)}
          style={{ color: "grey", cursor: "pointer" }}
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

const Chat = props => {
  const { chat } = props;

  return (
    <div className="chat-bubble">
      <Row>
        <Col>
          <label style={{ fontSize: "9pt", color: "grey" }}>
            <strong>{chat.category.toUpperCase()}</strong>
          </label>
          <br />
          {chat.message}
        </Col>
        <Col xs={3} style={{ alignSelf: "flex-end" }}>
          <label style={{ fontSize: "8pt" }}>{chat.date_time}</label>
        </Col>
      </Row>
    </div>
  );
};

const Detail = props => {
  const { proj } = props;

  const [chats, setChats] = useState([]);
  const [selectedCategory, selectCategory] = useState();

  useEffect(
    () => {
      let timer1 = setInterval(() => {
        fetch(apiURL)
          .then((resp) => resp.json())
          .then(data => {
            if (data.length !== chats.length)
              setChats(data);
          })
      }, [1000]);

      return () => {
        clearInterval(timer1);
      };
    });

  return (
    <div id="Detail">
      <Row>
        <Col className="command-list" style={{ padding: "1rem 0" }}>
          <Row>
            <Col style={{ paddingLeft: "1rem" }}>
              <Form>
                <FormControl type="text" placeholder="Search" />
              </Form>
            </Col>
            <Col xs={3} style={{ paddingRight: "2rem" }}>
              <Button variant="light" style={{ borderColor: "grey" }} block>
                <FontAwesomeIcon icon={faPlus} /> Command
              </Button>
            </Col>
          </Row>
          <hr style={{ marginBottom: 0 }} />

          <div className="commands">
            {isNullOrUndefined(commands[proj.id - 1])
              ? null
              : commands[proj.id - 1].map((cmd, i) => (
                <CommandCard
                  key={i}
                  cmd={cmd}
                  selectCategory={selectCategory}
                />
              ))}
          </div>
        </Col>
        <Col md={4} className="chat-log">
          <div className="chats">
            <header
              style={{
                textAlign: "center",
                margin: "1rem 0",
                color: "grey",
                zIndex: 100
              }}
            >
              <Row>
                {!isNullOrUndefined(selectedCategory) ? (
                  <Col xs={1}>
                    <Button
                      variant="link"
                      style={{ padding: 0, color: "grey", cursor: "pointer" }}
                      onClick={() => selectCategory(undefined)}
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                  </Col>
                ) : null}
                <Col>
                  <strong style={{ color: "#333E50" }}>
                    {isNullOrUndefined(selectedCategory)
                      ? "LOG"
                      : selectedCategory.toUpperCase()}
                  </strong>
                </Col>
                {!isNullOrUndefined(selectedCategory) ? <Col xs={1} /> : null}
              </Row>
            </header>

            <hr />
            {chats.map((chat, i) =>
              isNullOrUndefined(selectedCategory) ? (
                <div
                  key={i}
                  className={"chat " + (chat.from_roger ? "chat-roger" : null)}
                >
                  <Chat chat={chat} />
                </div>
              ) : selectedCategory === chat.category ? (
                <div
                  key={i}
                  className={"chat " + (chat.from_roger ? "chat-roger" : null)}
                >
                  <Chat chat={chat} />
                </div>
              ) : null
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
