import React, { useState, useEffect } from "react";
import { Form, FormControl, Row, Col, InputGroup, Button, Modal } from "react-bootstrap";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

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
const addNewCommand = {
  title: "New Command",
  keyword: '',
  code: 'def func_new(msg):\r\n    # What to do with the message?\r\n    pass'
};

const commands = [
  [
    {
      name: "emergency",
      title: "Emergency",
      icon: faAmbulance,
      list: ["Call an ambulance", "Forecast hazard"],
      keyword: 'darurat',
      code: 'def func_emergency(msg):\r\n    TWILIO_PHONE_NUMBER = "+12055516176"\r\n    DIAL_NUMBER = "+6282245754436"\r\n\r\n    print(\'[Emergency Module] Emergency status is set, calling\', DIAL_NUMBER)\r\n    client = Client("AC1a71fde45cddebd964fbfc0fbe380079",\r\n                    "e3b51eb7145b1dd1a0945fe66b867e6f")\r\n\r\n    if re.search(\'pendarahan\', msg, re.I):\r\n        inst_url = "https://ashura.id/roger/pendarahan_dalam.xml"\r\n    else:\r\n        inst_url = "https://ashura.id/roger/jatuh_5_meter.xml"\r\n\r\n    client.calls.create(to=DIAL_NUMBER, from_=TWILIO_PHONE_NUMBER,\r\n                        url=inst_url, method="GET")\r\n\r\n    emergency_chat = Chat(message=msg, category=\'emergency\')\r\n    db.session.add(emergency_chat)\r\n    db.session.commit()\r\n\r\n    playsound(\'responses/emergency.mp3\')'
    },

    {
      name: "report",
      title: "Progress Report",
      icon: faTasks,
      list: [],
      keyword: 'lapor',
      code: 'def func_report(msg):\r\n    print(\'[Report Module] Logged:\', msg)\r\n\r\n    chat = Chat(message=msg, category=\'report\')\r\n    db.session.add(chat)\r\n    db.session.commit()'
    },

    {
      name: "announcement",
      title: "Announcement",
      icon: faBell,
      list: [],
      keyword: '',
      code: 'def func_announce(msg):\r\n    pass'
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

const CodeModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.cmd.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Keyword</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            value={props.cmd.keyword}
            placeholder="Word/s Roger will affliate the function with"
            aria-label="regex"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <AceEditor
          style={{ width: '100%' }}
          mode="python"
          theme="monokai"
          name="blah2"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={props.cmd.code}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Discard</Button>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

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
          <Button variant="link" style={{ padding: 0, verticalAlign: 'baseline' }} onClick={() => props.setModalShow(cmd)}>
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
  const [modalShow, setModalShow] = React.useState(false);

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
      <CodeModal
        show={!!modalShow}
        cmd={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Row>
        <Col className="command-list" style={{ padding: "1rem 0" }}>
          <Row>
            <Col style={{ paddingLeft: "1rem" }}>
              <Form>
                <FormControl type="text" placeholder="Search" />
              </Form>
            </Col>
            <Col xs={3} style={{ paddingRight: "2rem" }}>
              <Button variant="light" style={{ borderColor: "grey" }} block onClick={() => setModalShow(addNewCommand)}>
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
                  setModalShow={setModalShow}
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
