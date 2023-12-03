import React from "react";
import {
  render, screen, fireEvent, act,
} from "@testing-library/react";
import Quiz from "./Quiz";

const questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
];

describe("Quiz component", () => {
  test("renders questions and options", () => {
    render(
      <Quiz
        questions={questions}
        onAnswer={jest.fn()}
        isFinish={false}
        tryAgain={jest.fn()}
      />,
    );

    const start = screen.getByText("Start Quiz");
    fireEvent.click(start);

    questions.forEach((question) => {
      const questionElement = screen.getByText(question.question);
      expect(questionElement).toBeInTheDocument();

      question.options.forEach((option) => {
        const optionElement = screen.getByText(option);
        expect(optionElement).toBeInTheDocument();
      });
    });
  });

  test("allows selecting options", () => {
    const onAnswerMock = jest.fn();

    render(
      <Quiz
        questions={questions}
        onAnswer={onAnswerMock}
        isFinish={false}
        tryAgain={jest.fn()}
      />,
    );

    const optionToSelect = screen.getByText(questions[0].options[0]);
    fireEvent.click(optionToSelect);

    expect(optionToSelect).toHaveClass("bg-blue-500 text-white");

    expect(onAnswerMock).toHaveBeenCalledWith({ 0: questions[0].options[0] }, ["4"]);
  });

  test("handles timer correctly", async () => {
    jest.useFakeTimers();

    const onAnswerMock = jest.fn();
    const tryAgainMock = jest.fn();

    render(
      <Quiz
        questions={questions}
        onAnswer={onAnswerMock}
        isFinish={false}
        tryAgain={tryAgainMock}
      />,
    );

    expect(screen.getByText("Timer: 00:00")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByText("Timer: 00:50")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(50000);
    });

    expect(onAnswerMock).toHaveBeenCalled();

    expect(tryAgainMock).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
