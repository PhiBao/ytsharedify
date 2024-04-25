import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import RegisterDialog from "./RegisterDialog";

jest.mock("../../services/authService", () => ({
  loginWithJwt: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockOnLogin = jest.fn();

describe("RegisterDialog", () => {
  test("opens and closes the dialog", async () => {
    const { getByText, queryByText } = render(
      <AuthContext.Provider
        value={{ user: null, onLogin: mockOnLogin, onLogout: () => {} }}
      >
        <RegisterDialog />
      </AuthContext.Provider>
    );

    fireEvent.click(getByText("Register"));
    expect(getByText("Cancel")).toBeTruthy();

    fireEvent.click(getByText("Cancel"));
    await waitFor(() => expect(queryByText("Cancel")).toBeNull());
  });

  test("registers the user", async () => {
    const { getByText, container } = render(
      <AuthContext.Provider
        value={{ user: null, onLogin: mockOnLogin, onLogout: () => {} }}
      >
        <RegisterDialog />
      </AuthContext.Provider>
    );

    fireEvent.click(getByText("Register"));

    const emailLabel = container.querySelector("label[for='email']");
    const passwordLabel = container.querySelector("label[for='password']");
    const confirmPasswordLabel = container.querySelector(
      "label[for='confirmPassword']"
    );
    const firstNameLabel = container.querySelector("label[for='firstName']");
    const lastNameLabel = container.querySelector("label[for='lastName']");

    if (
      emailLabel &&
      passwordLabel &&
      firstNameLabel &&
      lastNameLabel &&
      confirmPasswordLabel
    ) {
      const emailForm = emailLabel.parentElement;
      const passwordForm = passwordLabel.parentElement;
      const firstNameForm = firstNameLabel.parentElement;
      const lastNameForm = lastNameLabel.parentElement;
      const confirmPasswordForm = confirmPasswordLabel.parentElement;

      if (
        emailForm &&
        passwordForm &&
        firstNameForm &&
        lastNameForm &&
        confirmPasswordForm
      ) {
        const emailInputElement = emailForm.querySelector("input");
        const firstNameInputElement = firstNameForm.querySelector("input");
        const lastNameInputElement = lastNameForm.querySelector("input");
        const passwordInputElement = passwordForm.querySelector(
          "input[type='password']"
        );
        const confirmPasswordInputElement = confirmPasswordForm.querySelector(
          "input[type='password']"
        );

        if (
          emailInputElement &&
          passwordInputElement &&
          firstNameInputElement &&
          lastNameInputElement &&
          confirmPasswordInputElement
        ) {
          fireEvent.change(emailInputElement, {
            target: { value: "test@example.com" },
          });
          fireEvent.change(passwordInputElement, {
            target: { value: "password" },
          });
          fireEvent.change(confirmPasswordInputElement, {
            target: { value: "password" },
          });
          fireEvent.change(firstNameInputElement, {
            target: { value: "John" },
          });
          fireEvent.change(lastNameInputElement, {
            target: { value: "Doe" },
          });

          global.fetch = jest.fn(
            () =>
              Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: "fake_token" }),
              }) as Promise<Response>
          );

          fireEvent.click(getByText("Register"));

          await waitFor(() => expect(mockOnLogin).toHaveBeenCalled());
        }
      }
    }
  });
});
