import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";

import { v4 } from "uuid";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleTickers, setVisibleTickers] = useState({
    AAPL: true,
    GOOGL: true,
    MSFT: true,
    AMZN: true,
    FB: true,
    TSLA: true,
  });

  // const count = useSelector((state) => state.counter.value);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(2);

  useEffect(() => {
    // DidUpdate
    socket.emit("start");

    socket.on("ticker", (data) => {
      setData(data);
    });
    // =========

    // DidUnmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("ticker");
    };
    // ==========
  }, []);

  useEffect(() => {
    setFilteredData(data.filter(({ ticker }) => visibleTickers[ticker]));
  }, [data, visibleTickers]);

  return (
    <Container className="App">
      <Row className="justify-content-center pt-5">
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <p>{count}</p>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
          +{incrementAmount}
        </Button>
        <Button onClick={() => dispatch(incrementAsync(incrementAmount))}>
          +{incrementAmount} (Async)
        </Button>
      </Row>
      <Row className="justify-content-center pt-5">
        <Col>
          <Form>
            {Object.entries(visibleTickers)
              .map((ticker) => ({ name: ticker[0], status: ticker[1] }))
              .map(({ name, status }) => (
                <Form.Check
                  key={name}
                  type="switch"
                  checked={status}
                  label={name}
                  onChange={() =>
                    setVisibleTickers({
                      ...visibleTickers,
                      [name]: !status,
                    })
                  }
                />
              ))}
          </Form>
        </Col>
        <Col xs={12} md={8} lg={6}>
          <Table
            striped
            bordered
            hover
            responsive
            style={{ whiteSpace: "nowrap" }}
          >
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Change %</th>
                <th>Divident</th>
                <th>Yield</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(
                ({
                  ticker,
                  price,
                  yield: _yield,
                  dividend,
                  change_percent,
                }) => (
                  <tr key={v4()}>
                    <td>{ticker}</td>
                    <td>{price}</td>
                    <td>{change_percent}</td>
                    <td>{dividend}</td>
                    <td
                      className={_yield > 1 ? "table-success" : "table-danger"}
                    >
                      {_yield > 1 ? (
                        <i className="bi bi-arrow-up"></i>
                      ) : (
                        <i className="bi bi-arrow-down"></i>
                      )}
                      {_yield}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
