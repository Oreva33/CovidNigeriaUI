import React, { useState, useEffect, useCallback } from "react";
import classes from "./App.module.css";
import State from "../src/components/State/State";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://covidnigeria.herokuapp.com/api");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      setMovies(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;

  if (movies.data) {
    content = (
      <React.Fragment>
        <header className={classes["header-wrapper"]}>
          <div>
            <h1 className={classes["header-wrapper-item1"]}>
              COVID-19 NIGERIA
            </h1>
          </div>

          <div className={classes["header-wrapper-item2"]}>
            <span>Samples Tested</span>
            <span>{movies.data["totalSamplesTested"]}</span>
          </div>
          <div className={classes["header-wrapper-item3"]}>
            <div className={classes["header-wrapper-item3-1"]}>
              <span>Confirmed Cases</span>
              <span>{movies.data["totalConfirmedCases"]}</span>
            </div>
            <div className={classes["header-wrapper-item3-2"]}>
              <span>Active Cases</span>
              <span>{movies.data["totalActiveCases"]}</span>
            </div>
            <div className={classes["header-wrapper-item3-3"]}>
              <span>Discharged Cases</span>
              <span>{movies.data["discharged"]}</span>
            </div>

            <div className={classes["header-wrapper-item3-4"]}>
              <span>Death</span>
              <span>{movies.data["death"]}</span>
            </div>
          </div>
        </header>
        <h2>Confirmed Cases by State</h2>
        <main className={classes["main-wrapper"]}>
          {/* <State/>
          {console.log(movies.data.states)} */}
          {movies.data.states.map((state) => {
            return (
              <State
                key={state["_id"]}
                state={state.state}
                confirmedCases={state.confirmedCases}
                casesOnAdmission={state.casesOnAdmission}
                discharged={state.discharged}
                death={state.death}
              />
            );
          })}
        </main>
      </React.Fragment>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return <React.Fragment>{content}</React.Fragment>;
}

export default App;
