import React from "react";
import {
  render, screen, waitFor, fireEvent,
} from "@testing-library/react";
import axios from "axios";
import Exam from "./index";

jest.mock("axios");

describe("Exam component", () => {
  const mockQuestions = [
    {
      question: "Mock Question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 1",
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { results: mockQuestions } });
  });

  test("renders instructions when quiz starts", async () => {
    render(<Exam />);

    const instructions = screen.getByText(/Welcome to the Quiz/i);
    expect(instructions).toBeInTheDocument();

    const startQuizButton = screen.getByText("Start Quiz");
    fireEvent.click(startQuizButton);

    await waitFor(() => {
      const question = screen.getByText(/Mock Question 1?/i);
      expect(question).toBeInTheDocument();
    });
  });

  test("handles answer submission and displays result", async () => {
    render(<Exam />);

    const startQuizButton = screen.getByText("Start Quiz");
    fireEvent.click(startQuizButton);

    await waitFor(() => {
      const question = screen.getByText(/Mock Question 1?/i);
      expect(question).toBeInTheDocument();
    });

    const answerOption = screen.getByText("Option 1");
    fireEvent.click(answerOption);

    const submitButton = screen.getByText("Submit Answers");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const resultMessage = screen.getByText(/Quiz Completed!/i);
      expect(resultMessage).toBeInTheDocument();

      const scoreMessage = screen.getByText(/Your Score: 1\/1/i);
      expect(scoreMessage).toBeInTheDocument();
    });
  });
});
