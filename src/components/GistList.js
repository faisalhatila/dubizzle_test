import React from "react";
import Gist from "./Gist";
const GistList = ({ search = "", items = [], loading }) => {
  return (
    <>
      <div className="container" data-testid="gistList">
        {
          // Checking for loading state
          !!loading ? (
            <p data-testid="loading">Loading</p>
          ) : // Checking for items length witout filtering
          !!items?.length &&
            // Checking for items length with filtering
            !!items?.filter((el) => el.full_name.includes(search))?.length ? (
            items
              ?.filter((el) => el.full_name.includes(search))
              ?.map((item, i) => <Gist gist={item} key={i} />)
          ) : (
            // When no data found
            <p data-testid="noResult">No Result Found</p>
          )
        }
      </div>
    </>
  );
};

export default GistList;
