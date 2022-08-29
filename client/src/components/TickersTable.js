import { Table } from "react-bootstrap";

function TickersTable({ data }) {
  return (
    <Table striped bordered hover responsive style={{ whiteSpace: "nowrap" }}>
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
        {data.map(
          ({ ticker, price, yield: _yield, dividend, change_percent }) => (
            <tr key={ticker}>
              <td>{ticker}</td>
              <td>{price}</td>
              <td>{change_percent}</td>
              <td>{dividend}</td>
              <td className={_yield > 1 ? "table-success" : "table-danger"}>
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
  );
}

export default TickersTable;
