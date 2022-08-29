import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import { useState, useEffect } from "react";

import { useSubscribeToEventsQuery } from "./store/baseApi";

import TickersTable from "./components/TickersTable";
import TickersFilter from "./components/TickersFilter";

function App() {
  const { data, isLoading, isSuccess, isError, error } =
    useSubscribeToEventsQuery();

  const [filteredData, setFilteredData] = useState([]);
  const [visibleTickers, setVisibleTickers] = useState({
    AAPL: true,
    GOOGL: true,
    MSFT: true,
    AMZN: true,
    FB: true,
    TSLA: true,
  });

  useEffect(() => {
    isSuccess &&
      setFilteredData(data.filter(({ ticker }) => visibleTickers[ticker]));
  }, [data, isSuccess, visibleTickers]);

  const onChangeFilter = (name, status) =>
    setVisibleTickers({
      ...visibleTickers,
      [name]: !status,
    });

  return (
    <Container className="App">
      <Row className="justify-content-center pt-5">
        {isLoading && <Spinner animation="border" variant="primary" />}

        {isError && <p>{error.toString()}</p>}

        {isSuccess && (
          <>
            <Col>
              <TickersFilter
                tickers={visibleTickers}
                onChange={onChangeFilter}
              ></TickersFilter>
            </Col>
            <Col xs={12} md={8} lg={6}>
              <TickersTable data={filteredData}></TickersTable>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default App;
