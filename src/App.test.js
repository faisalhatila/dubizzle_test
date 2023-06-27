import { fireEvent, getByTestId, waitFor } from "@testing-library/dom";
import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";
import Search from "./components/Search";
import { Octokit } from "@octokit/rest";
import GistList from "./components/GistList";
import { act } from "react-dom/test-utils";

const TEST_IDS = {
  noResultID: "noResult",
  searchBox: "searchBox",
  gistList: "gistList",
  // gistItem: "gist",
  gistItem: "gist-item",
};
const mockGistList = [
  {
    id: 417862,
    full_name: "octokit.rb",
    owner: {
      avatar_url: "https://avatars.githubusercontent.com/u/3430433?v=4",
    },
    forks_url: "https://api.github.com/repos/octokit/octokit.rb/forks",
    created_at: "2009-12-10T21:41:49Z",
    updated_at: "2023-06-19T17:40:40Z",
  },
  {
    id: 711976,
    full_name: "octokit.js",
    owner: {
      avatar_url: "https://avatars.githubusercontent.com/u/3430433?v=4",
    },
    created_at: "2010-06-09T17:07:03Z",
    updated_at: "2023-06-26T07:49:30Z",
  },
  {
    id: 7528679,
    full_name: "octokit.net",
    owner: {
      avatar_url: "https://avatars.githubusercontent.com/u/3430433?v=4",
    },
    created_at: "2013-01-09T20:48:45Z",
    updated_at: "2023-06-26T10:33:43Z",
  },
  {
    id: 7530454,
    full_name: "octokit.objc",
    owner: {
      avatar_url: "https://avatars.githubusercontent.com/u/3430433?v=4",
    },
    created_at: "2013-01-09T22:42:53Z",
    updated_at: "2023-05-10T19:12:44Z",
  },
  {
    id: 10575811,
    full_name: "go-octokit",
    owner: {
      avatar_url: "https://avatars.githubusercontent.com/u/3430433?v=4",
    },
    forks_url: "https://api.github.com/repos/octokit/go-octokit/forks",
    created_at: "2013-06-08T23:50:29Z",
    updated_at: "2023-05-27T07:32:18Z",
  },
];
// Mocking Octokit
jest.mock("@octokit/rest", () => ({
  Octokit: jest.fn(() => ({
    data: jest.fn().mockResolvedValueOnce({ data: [mockGistList] }),
  })),
}));
//Test for displaying Loading
describe("Display Loading", () => {
  it("Should Display Loading", async () => {
    await act(async () => {
      render(<GistList loading={true} />);
    });
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });
});
// Test for no result to be rendered
describe("No Result Found", () => {
  it("Should display no result found element ", async () => {
    await act(async () => {
      render(<GistList items={[]} loading={false} error={null} />);
    });
    expect(screen.getByTestId(TEST_IDS.noResultID)).toBeInTheDocument();
  });
});
// Displaying All List Items
describe("Display GIST List", () => {
  it("Should should display list of gists", async () => {
    await act(async () => {
      render(<GistList items={mockGistList} loading={false} error={null} />);
    });
    expect(screen.getByTestId(TEST_IDS.gistList)).toBeInTheDocument();
    const list = screen.getAllByTestId(TEST_IDS.gistItem);
    expect(list).toHaveLength(5);
    expect(screen.getByText("octokit.rb")).toBeInTheDocument();
    expect(screen.getByText("octokit.js")).toBeInTheDocument();
    expect(screen.getByText("octokit.objc")).toBeInTheDocument();
    expect(screen.getByText("go-octokit")).toBeInTheDocument();
  });
});
// Filltering data
describe("Filtering", () => {
  it("should render whole app and apply filters", async () => {
    await act(async () => {
      render(
        <App>
          <GistList
            items={{ loading: false, data: mockGistList, error: null }}
          />
        </App>
      );
    });
    expect(screen.getByTestId(TEST_IDS.gistList)).toBeInTheDocument();
    expect(screen.getAllByTestId(TEST_IDS.gistItem)).toHaveLength(5);
    const search = screen.getByTestId("searchBox");
    fireEvent.change(search, { target: { value: ".rb" } });
    const list = screen.getAllByTestId(TEST_IDS.gistItem);
    expect(list).toHaveLength(1);
  });
});
