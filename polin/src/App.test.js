import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders Polin app header and navigation", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const headingElement = screen.getByText(/buku-buku terbaru/i);
  expect(headingElement).toBeInTheDocument();
});

