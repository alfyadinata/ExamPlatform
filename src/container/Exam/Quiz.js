/* eslint-disable react/no-danger */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";

const Quiz = ({
  questions, onAnswer, isFinish, tryAgain,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [seconds, setSeconds] = useState(60);

  const handleOptionClick = (questionId, option) => {
    setSelectedOptions({ ...selectedOptions, [questionId]: option });
  };

  const handleSubmit = () => {
    onAnswer(selectedOptions, questions.map((q) => q.correctAnswer));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isFinish) setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (seconds < 1 && !isFinish) {
      handleSubmit();
      setSeconds(60);
    }
  }, [seconds]);
  const formattedTime = `${Math.floor(seconds / 60)}:${(seconds % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;

  const tryAgainClone = () => {
    tryAgain();
    setSeconds(60);
  };

  return (
    <div>
      {
        !isFinish && (
          <div>
            <div className="fixed top-1/2 right-0 transform -translate-y-1/2 w-100 h-16 bg-gray-800 text-white p-4 text-center">
              <p className="text-lg font-semibold">
                Timer:
                {" "}
                {formattedTime}
              </p>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Questions</h2>
            <ul className="space-y-4">
              {questions.map((question, index) => (
                <li key={question.question}>
                  <p className="text-lg" dangerouslySetInnerHTML={{ __html: question.question }} />
                  <ul className="space-y-2">
                    {question.options.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleOptionClick(index, option)}
                        className={`${
                          selectedOptions[index] === option
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        } py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300 cursor-pointer`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )
      }
      <button
        onClick={isFinish ? tryAgainClone : handleSubmit}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
      >
        {isFinish ? "Try again" : "Submit Answers"}
      </button>
    </div>
  );
};

export default Quiz;
