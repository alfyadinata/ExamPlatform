import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Assuming you use Redux

import Header from "./index";

const mockStore = configureStore([]);

describe("Header component", () => {
  test("renders Exam Platform title", () => {
    render(
      <Provider store={mockStore({ currentUser: { username: "testUser" } })}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );

    const titleElement = screen.getByText("Exam Platform");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders user information and logout button when user is logged in", () => {
    render(
      <Provider store={mockStore({ currentUser: { username: "testUser" } })}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );

    const usernameElement = screen.getByText("testUser");
    const logoutButton = screen.getByText("Logout");

    expect(usernameElement).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
