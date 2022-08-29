import { Form } from "react-bootstrap";

function TickersFilter({ tickers, onChange }) {
  return (
    <Form>
      {Object.entries(tickers)
        .map((ticker) => ({ name: ticker[0], status: ticker[1] }))
        .map(({ name, status }) => (
          <Form.Check
            key={name}
            type="switch"
            checked={status}
            label={name}
            onChange={() => onChange(name, status)}
          />
        ))}
    </Form>
  );
}

export default TickersFilter;
