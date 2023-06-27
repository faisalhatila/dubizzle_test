import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GistList from "./components/GistList";
import { Octokit } from "@octokit/rest";
const App = () => {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState({
    loading: false,
    data: [],
    error: null,
  });
  const octokit = new Octokit();
  React.useEffect(() => {
    // Fetching function
    const fetchData = async () => {
      // Setting loading state to true
      setData((ps) => ({
        ...ps,
        loading: true,
      }));
      try {
        octokit.rest.repos
          .listForOrg({
            org: "octokit",
            type: "public",
          })
          .then(({ data }) => {
            // manupulating data according to requirements
            const tempData = data.map((item) => ({
              // ...item,
              id: item?.id,
              full_name: item?.full_name.split("/")[1],
              owner: {
                avatar_url: item?.owner?.avatar_url,
              },
              forks_url: item?.forks_url,
              created_at: item?.created_at,
              updated_at: item?.updated_at,
            }));
            // Setting up state with required data and loading state
            setData((ps) => ({
              ...ps,
              loading: false,
              data: tempData,
            }));
          });
      } catch (error) {
        setData((ps) => ({
          ...ps,
          loading: false,
          error: error?.message,
        }));
      }
    };
    // Calling fundtion
    fetchData();
    // Cleanup
    return () => {
      setData({ loading: false, data: [], error: null });
    };
  }, []);
  return (
    <Wrapper className="App" data-testid="app">
      <Header setSearch={setSearch} search={search} />
      <GlobalStyles />
      <GistList
        items={[
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
        ]}
        loading={data?.loading}
        error={data.error}
        search={search}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;
