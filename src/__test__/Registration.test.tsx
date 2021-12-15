import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Registration from "../pages/Registration";
import Quiz from "../pages/Quiz";

beforeEach(() => {
  render(<Registration />);
});

test("should disabled submit button initially", async () => {
  const buttonEl = screen.getByTestId("submitForm");
  expect(buttonEl).toBeDisabled();
});

test("should not disabled submit button when input is given", async () => {
  const inputEl = screen.getByTestId("nameField");
  fireEvent.change(inputEl, { target: { value: "Jeet Desai" } });

  const buttonEl = screen.getByTestId("submitForm");
  expect(buttonEl).not.toBeDisabled();
});

test("should navigate the quiz page after submitting form", async () => {
  const history = createMemoryHistory();
  history.push({
    pathname: "/quiz",
    state: { language: "English", name: "Danial", gender: "Male" },
  });
  const { getByText } = render(
    <Router history={history}>
      <Quiz />
    </Router>
  );
  await waitFor(async () =>
    expect(getByText(/Hi, Danial/i)).toBeInTheDocument()
  );
});
