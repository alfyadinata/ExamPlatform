import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./Quiz";

const Exam = () => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [readInstructions, setReadInstructions] = useState(false);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&type=multiple",
      );
      setQuestions(response.data.results.map((result) => ({
        question: result.question,
        options: [...result.incorrect_answers, result.correct_answer].sort(() => Math.random() - 0.5),
        correctAnswer: result.correct_answer,
      })));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswer = (selectedOptions, correctAnswers) => {
    const newScore = questions.reduce((acc, _, index) => {
      const isCorrect = selectedOptions[index] === correctAnswers[index];
      return isCorrect ? acc + 1 : acc;
    }, 0);

    setScore(newScore);
    setIsFinish(true);
  };

  const tryAgain = () => {
    setIsFinish(false);
    setScore(0);
    fetchQuestions();
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const instructions = `
    Welcome to the Quiz!
    
    Instructions:
    
    1. Read each question carefully before selecting an answer.
    2. Select the most appropriate answer for each question.
    3. You can only choose one answer per question.
    4. After answering all questions, click the "Submit Answers" button.
    5. Your score will be displayed at the end of the quiz.
    
    Good luck!
  `;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-white mb-4">Quiz Time!</h2>
        {!readInstructions && (
          <div className="mb-4 text-white">
            <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
            <p>{instructions}</p>
            <button
              onClick={() => setReadInstructions(true)}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              type="button"
            >
              Start Quiz
            </button>
          </div>
        )}
        {
          readInstructions && (
            <div>
              {questions.length > 0 ? (
                <Quiz questions={questions} onAnswer={handleAnswer} isFinish={isFinish} tryAgain={tryAgain} />
              ) : (
                <p className="text-white">Loading questions...</p>
              )}
            </div>
          )
        }
        {
          isFinish && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-white mb-2">Quiz Completed!</h2>
              <p className="text-lg text-white">
                Your Score:
                {" "}
                {score}
                /
                {questions.length}
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Exam;
