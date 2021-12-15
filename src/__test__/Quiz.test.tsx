import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import FillInBlank from "../components/Question/fill-in-blank";

test("On selecting answer it's relevant handler is called", async () => {
  const mockFn = jest.fn();
  const { getByTestId } = render(
    <FillInBlank question="2 + 2 = _ ?" handleAnswer={mockFn} answer="" />
  );

  const inputElement = getByTestId("fillInput");

  await act(async () => {
    fireEvent.change(inputElement, {
      target: { value: "4" },
    });
  });

  await waitFor(async () => {
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
