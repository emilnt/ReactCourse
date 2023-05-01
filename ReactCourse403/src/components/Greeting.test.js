import Greeting from "./Greeting";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Greeting component", () => {
  test("renders Hello world", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ...nothing

    // Assert
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders unchanged text if button was NOT clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    // ...nothing

    // Assert
    const unchangedTextElement = screen.getByText("good to see you", {
      exact: false,
    });
    expect(unchangedTextElement).toBeInTheDocument();
  });

  test("renders changed text if button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    userEvent.click(screen.getByRole("button"));

    // Assert
    const changedTextElement = screen.getByText("changed", {exact: false});
    expect(changedTextElement).toBeInTheDocument();
  });

  test("does NOT render unchanged text if button was clicked", () => {
    // Arrange
    render(<Greeting />);

    // Act
    userEvent.click(screen.getByRole("button"));

    // Assert
    const changedTextElement = screen.queryByText("good to see you", {exact: false});
    expect(changedTextElement).toBeNull();
  });
});
