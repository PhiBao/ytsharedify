import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import LoginDialog from "./LoginDialog";

// Mock the authService
jest.mock("../../services/authService", () => ({
  loginWithJwt: jest.fn(),
}));

// Mock the toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("LoginDialog", () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const { getByText } = render(
      <AuthContext.Provider
        value={{ user: null, onLogin: mockOnLogin, onLogout: () => {} }}
      >
        <LoginDialog />
      </AuthContext.Provider>
    );

    expect(getByText("Login")).toBeTruthy();
  });

  test("opens and closes the dialog", async () => {
    const { getByText, queryByText } = render(
      <AuthContext.Provider
        value={{ user: null, onLogin: mockOnLogin, onLogout: () => {} }}
      >
        <LoginDialog />
      </AuthContext.Provider>
    );

    fireEvent.click(getByText("Login"));
    expect(getByText("Cancel")).toBeTruthy();

    fireEvent.click(getByText("Cancel"));
    await waitForElementToBeRemoved(() => queryByText("Cancel"));
  });

  test("logs in the user", async () => {
    const { getByText, container } = render(
      <AuthContext.Provider
        value={{ user: null, onLogin: mockOnLogin, onLogout: () => {} }}
      >
        <LoginDialog />
      </AuthContext.Provider>
    );

    fireEvent.click(getByText("Login"));

    const emailLabel = container.querySelector("label[for='email']");
    const passwordLabel = container.querySelector("label[for='password']");

    if (emailLabel && passwordLabel) {
      const emailForm = emailLabel.parentElement;
      const passwordForm = passwordLabel.parentElement;

      if (emailForm && passwordForm) {
        const emailInputElement = emailForm.querySelector("input");
        const passwordInputElement = passwordForm.querySelector(
          "input[type='password']"
        );

        if (emailInputElement && passwordInputElement) {
          fireEvent.change(emailInputElement, {
            target: { value: "test@example.com" },
          });
          fireEvent.change(passwordInputElement, {
            target: { value: "password" },
          });

          global.fetch = jest.fn(
            () =>
              Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: "fake_token" }),
              }) as Promise<Response>
          );

          fireEvent.click(getByText("Login"));

          await waitFor(() => expect(mockOnLogin).toHaveBeenCalled());
        }
      }
    }
  });
});
