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
        items={data.data}
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
