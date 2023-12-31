import React from "react";
import { AiOutlineFork, AiFillStar, AiOutlineFileText } from "react-icons/ai";
import { BsCode } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import classes from "./style.module.css";
import moment from "moment";
const Gist = ({ gist }) => (
  <>
    <div
      data-testid="gist-item"
      className={[classes["gist-item-wrapper"], "my-4"].join(" ")}
    >
      <div
        className={[
          classes["gist-first-row"],
          "d-flex",
          "justify-content-between",
          "align-items-center",
        ].join(" ")}
      >
        <div className="d-flex align-items-center">
          <div className={classes["avatar-div-parent"]}>
            <div
              className={classes["avatar-div"]}
              style={{ backgroundImage: `url("${gist?.owner?.avatar_url}")` }}
            />
          </div>
          <div className={classes["title-wrapper"]}>
            <p className={[classes["user-name"], "my-0 mx-3"].join(" ")}>
              {gist?.full_name}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mx-2">
            <BsCode color="#3366CC" size={16} />
            <label className={[classes["actions-labels"], "mx-1"].join(" ")}>
              1 Files
            </label>
          </div>
          <div className="d-flex align-items-center">
            <a href={gist?.forks_url} target="_blank">
              <AiOutlineFork color="#3366CC" size={16} />
              <label className={[classes["actions-labels"], "mx-1"].join(" ")}>
                Forks
              </label>
            </a>
          </div>
          <div className="d-flex align-items-center mx-2">
            <BiComment color="#3366CC" size={16} />
            <label className={[classes["actions-labels"], "mx-1"].join(" ")}>
              Comments
            </label>
          </div>
          <div className="d-flex align-items-center">
            <AiFillStar color="#3366CC" size={16} />
            <label className={[classes["actions-labels"], "mx-1"].join(" ")}>
              Stars
            </label>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center my-3">
        <div>
          <p className="my-0">
            Created at: {moment(gist?.created_at).format("d/M/yyyy")}
          </p>
        </div>
        <div className="mx-3">
          <p className="my-0">
            Last updated: {moment(gist?.updated_at).format("d/M/yyyy")}
          </p>
        </div>
      </div>
      <div className="my-4">
        <p className={[classes["generated-by-title"], "my-0"].join(" ")}>
          Generated by XState Viz: https://xstate.js.org.viz
        </p>
      </div>
      <div className="mx-3">
        <div className="d-flex align-items-center mx-2">
          <AiOutlineFileText color="#3366CC" size={16} />
          <label className={[classes["actions-labels"], "mx-1"].join(" ")}>
            machine.js
          </label>
        </div>
      </div>
    </div>
    <hr />
    {/* <div>
      <AiOutlineFileText />
      <AiFillStar />
      <AiOutlineFork />
      <BsCode />
      <BiComment />
    </div> */}
  </>
);

export default Gist;
