import { useState } from "react";
import Banner from "./Banner";
import FlexLayoutGrid from "./FlexLayoutGrid";
import "./Home.css";
import "./Banner.css";

export const Home = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow&key=${process.env.REACT_APP_STACKOVERFLOW_KEY}`
      );

      const data = await response.json();

      setIsLoading(false);

      if (data.items) {
        setApiError("");
        console.log({ data });
        return data.items;
      } else {
        setApiError("Network Error");
        console.log({ data });
        return [];
      }
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
      setApiError("Network Error!");
    }
  };

  const handleOnClick = async () => {
    const result = await getQuestions();
    if (Array.isArray(result)) {
      setAllQuestions(result);
    }
  };

  const handleReset = () => {
    setAllQuestions([]);
  };

  return (
    <div className="container">
      <div className="main"></div>
      <Banner
        handleOnClick={handleOnClick}
        isLoading={isLoading}
        isDisabled={
          isLoading === false && allQuestions.length > 0 ? true : false
        }
      />

      {apiError && <p>Something went wrong: {apiError}</p>}

      {allQuestions.length > 0 && <FlexLayoutGrid questions={allQuestions} />}

      {allQuestions.length > 0 && (
        <div className="buttonWrapper">
          <button className="button" onClick={handleReset}>
            RESET
          </button>
        </div>
      )}
    </div>
  );
};
