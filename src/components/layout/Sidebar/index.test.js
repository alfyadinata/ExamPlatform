import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./index";

describe("Sidebar", () => {
  test("renders Dashboard link", () => {
    render(
      <Router>
        <Sidebar />
      </Router>,
    );

    const dashboardLink = screen.getByText("Dashboard");
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });

  test("renders Exam link", () => {
    render(
      <Router>
        <Sidebar />
      </Router>,
    );

    const examLink = screen.getByText("Exam");
    expect(examLink).toBeInTheDocument();
    expect(examLink).toHaveAttribute("href", "/exam");
  });
});
