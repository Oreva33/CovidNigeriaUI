import React from "react";
import classes from "./State.module.css"

const State = (props) => {
  return (
    <div className={classes["main-wrapper-item1"]}>
      <div className={classes["main-wrapper-item1-1"]}>{props.state}</div>
      <div className={classes["main-wrapper-item1-2"]}>
        <p><span>ConfirmedCases  </span>{props.confirmedCases}</p>
        <p><span>CasesOnAdmission  </span>{props.casesOnAdmission}</p>
        <p><span>Discharged  </span>{props.discharged}</p>
        <p><span>Death  </span>{props. death}</p>
      </div>
    </div>
  );
};

export default State;
