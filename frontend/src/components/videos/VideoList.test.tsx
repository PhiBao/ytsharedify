import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import VideoList from "./VideoList";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("VideoList", () => {
  test("fetchVideos fetches videos and updates state correctly", async () => {
    const mockSuccessResponse = {
      list: [
        {
          id: 1,
          title: "Test Video",
          description: "Test Description",
          user: { username: "Test User" },
          embed_url: "https://www.example.com",
        },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockSuccessResponse));

    const { getByText } = render(<VideoList />);

    await waitFor(() => expect(getByText("Test Video")).toBeInTheDocument());
    expect(getByText("Shared by Test User:")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();

    fetchMock.resetMocks();
  });
});
