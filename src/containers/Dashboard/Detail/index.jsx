import React, { useState, useEffect } from "react";

import { Form, FormControl, Row, Col, Image, Button } from "react-bootstrap";

import "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faCog,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

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
  const { cmd } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className={"card " + (open ? " card-open" : null)}>
      <Row>
        <Col xs={1} style={{textAlign:'center'}}>
          <Image src={cmd.imagePath} />
        </Col>
        <Col>
          <strong style={{marginRight: '1rem'}}>{cmd.title}</strong>
          <Button size="sm" variant="light" style={{backgroundColor: 'lightgrey'}}>
            <FontAwesomeIcon icon={faCog}  />
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
    const { chat } = props

    return (
        <div className="chat-bubble">
            <Row>
                <Col>
                    <label style={{fontSize: '9pt', color: 'grey'}}><strong>{chat.category.toUpperCase()}</strong></label><br/>
                    {chat.message}
                </Col>
                <Col xs={3} style={{alignSelf: 'flex-end'}}>
                    <label style={{fontSize: '8pt'}}>{chat.date_time}</label>
                </Col>
            </Row>
        </div>   
    )
};

const Detail = props => {
  const { proj } = props;
  
  const [chats, setChats] = useState([]);

  useEffect(
    () => {
      let timer1 = setInterval(() => {
        setChats(chatRes);
      }, [1000]);

      return () => {
        clearInterval(timer1);
      };
    }
  );

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
                  <CommandCard key={i} cmd={cmd} />
                ))}
          </div>
        </Col>
        <Col md={4} className="chat-log">
          <header
            style={{ textAlign: "center", margin: "1rem 0", color: "grey" }}
          >
            <strong style={{ color: "#333E50" }}>CHAT LOG</strong>
          </header>
          <hr />
          <div className="chats">
            {chats.map((chat, i) => (
              <div
                key={i}
                className={"chat " + (chat.from_roger ? "chat-roger" : null)}
              >
                <Chat chat={chat} />
              </div>
            ))}
            {chats.map((chat, i) => (
              <div
                key={i}
                className={"chat " + (chat.from_roger ? "chat-roger" : null)}
              >
                <Chat chat={chat} />
              </div>
            ))}
            {chats.map((chat, i) => (
              <div
                key={i}
                className={"chat " + (chat.from_roger ? "chat-roger" : null)}
              >
                <Chat chat={chat} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
