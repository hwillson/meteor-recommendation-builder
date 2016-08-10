import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer">
    <Row>
      <Col mdOffset={1} md={2}>
        <h3>Footer Menu 1</h3>
        <ul>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 1</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 2</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 3</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 4</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 5</a></li>
        </ul>
      </Col>
      <Col md={2}>
        <h3>Footer Menu 2</h3>
        <ul>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 1</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 2</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 3</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 4</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 5</a></li>
        </ul>
      </Col>
      <Col md={2}>
        <h3>Footer Menu 3</h3>
        <ul>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 1</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 2</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 3</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 4</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 5</a></li>
        </ul>
      </Col>
      <Col md={2}>
        <h3>Footer Menu 4</h3>
        <ul>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 1</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 2</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 3</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 4</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 5</a></li>
        </ul>
      </Col>
      <Col md={2}>
        <p className="copyright">Copyright Auto Awesome Inc.</p>
        <ul>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 1</a></li>
          <li><a href="todo" target="_blank" rel="noopener noreferrer">Item 2</a></li>
        </ul>
      </Col>
    </Row>
  </footer>
);

export default Footer;
