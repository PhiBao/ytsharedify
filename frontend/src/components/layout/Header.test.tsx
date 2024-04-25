import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "./Header";

describe("Header", () => {
  test("renders correct elements when user is logged in", () => {
    const mockUser = { id: 1, username: "Test User" };
    const { getByText } = render(
      <AuthContext.Provider
        value={{ user: mockUser, onLogin: () => {}, onLogout: () => {} }}
      >
        <Router>
          <Header />
        </Router>
      </AuthContext.Provider>
    );

    expect(getByText("YtSharedify")).toBeInTheDocument();
    expect(getByText(`Welcome ${mockUser.username}!`)).toBeInTheDocument();
    expect(getByText("Sign Out")).toBeInTheDocument();
  });

  test("calls onLogout when Sign Out button is clicked", () => {
    const mockUser = { id: 1, username: "Test User" };
    const mockOnLogout = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider
        value={{ user: mockUser, onLogin: () => {}, onLogout: mockOnLogout }}
      >
        <Router>
          <Header />
        </Router>
      </AuthContext.Provider>
    );

    fireEvent.click(getByText("Sign Out"));
    expect(mockOnLogout).toHaveBeenCalled();
  });
});
