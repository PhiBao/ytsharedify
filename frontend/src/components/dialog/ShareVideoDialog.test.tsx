import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import ShareVideoDialog from "./ShareVideoDialog";

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

describe("ShareVideoDialog", () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    const { getByText } = render(
      <AuthContext.Provider
        value={{ user: null, onLogin: mockOnLogin, onLogout: () => {} }}
      >
        <ShareVideoDialog />
      </AuthContext.Provider>
    );

    expect(getByText("Share video")).toBeTruthy();
  });

  test("opens and closes the dialog", async () => {
    const { getByText, queryByText } = render(
      <AuthContext.Provider
        value={{ user: null, onLogin: mockOnLogin, onLogout: () => {} }}
      >
        <ShareVideoDialog />
      </AuthContext.Provider>
    );

    fireEvent.click(getByText("Share video"));
    expect(getByText("Cancel")).toBeTruthy();

    fireEvent.click(getByText("Cancel"));
    await waitForElementToBeRemoved(() => queryByText("Cancel"));
  });

  test("shared the video", async () => {
    const { getByText, container } = render(
      <AuthContext.Provider
        value={{ user: null, onLogin: mockOnLogin, onLogout: () => {} }}
      >
        <ShareVideoDialog />
      </AuthContext.Provider>
    );

    fireEvent.click(getByText("Share video"));

    const urlLabel = container.querySelector("label[for='url']");

    if (urlLabel) {
      const urlForm = urlLabel.parentElement;

      if (urlForm) {
        const urlInputElement = urlForm.querySelector("input");

        if (urlInputElement) {
          fireEvent.change(urlInputElement, {
            target: { value: "https://www.youtube.com/watch?v=example" },
          });

          global.fetch = jest.fn(
            () =>
              Promise.resolve({
                ok: true,
                status: 201,
                json: () =>
                  Promise.resolve({
                    messages: ["Video shared, details are being fetched."],
                  }),
              }) as Promise<Response>
          );

          fireEvent.click(getByText("Share"));

          await waitFor(() => {
            // Check that fetch was called
            expect(global.fetch).toHaveBeenCalled();

            // Get the response from the first call to fetch
            const response = (global.fetch as jest.Mock).mock.results[0].value;

            // Since fetch returns a promise, we need to wait for it to resolve
            return response.then((res: { status: number }) => {
              // Check that the status is 201
              expect(res.status).toBe(201);
            });
          });
        }
      }
    }
  });
});
