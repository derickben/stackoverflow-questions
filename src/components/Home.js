import { useState } from "react";
import Banner from "./Banner";
import FlexLayoutGrid from "./FlexLayoutGrid";
import "./Home.css";
import "./Banner.css";

const items = [
  {
    tags: ["azure", "logging", "azure-blob-storage", "blob"],
    owner: {
      account_id: 8652361,
      reputation: 57,
      user_id: 8724092,
      user_type: "registered",
      profile_image:
        "https://www.gravatar.com/avatar/b8d264806bf8093db4547b53da2c0409?s=256&d=identicon&r=PG&f=1",
      display_name: "sysadmincrispy",
      link: "https://stackoverflow.com/users/8724092/sysadmincrispy",
    },
    is_answered: false,
    view_count: 30,
    answer_count: 1,
    score: 0,
    last_activity_date: 1663063306,
    creation_date: 1663044005,
    question_id: 73697621,
    content_license: "CC BY-SA 4.0",
    link: "https://stackoverflow.com/questions/73697621/log-analytics-questo-query-to-find-who-created-and-delete-my-conatiner-and-blob",
    title:
      "Log Analytics questo query to find who created and delete my conatiner and blob",
  },

  {
    tags: ["numpy", "performance", "opencv", "large-data"],
    owner: {
      account_id: 20530022,
      reputation: 1,
      user_id: 15067521,
      user_type: "registered",
      profile_image:
        "https://lh4.googleusercontent.com/-gQtxERqS12U/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnPz424AVG95WX9tdDOqTZFVM1zuQ/s96-c/photo.jpg?sz=256",
      display_name: "Shmulik Edelman",
      link: "https://stackoverflow.com/users/15067521/shmulik-edelman",
    },
    is_answered: false,
    view_count: 17,
    answer_count: 1,
    score: -1,
    last_activity_date: 1663063302,
    creation_date: 1663061592,
    question_id: 73700634,
    content_license: "CC BY-SA 4.0",
    link: "https://stackoverflow.com/questions/73700634/python-calculation-on-large-3d-numpy-arrays",
    title: "python, calculation on large 3d numpy arrays",
  },

  {
    tags: ["javascript", "html5-video", "rendering"],
    owner: {
      account_id: 22040961,
      reputation: 595,
      user_id: 16306754,
      user_type: "registered",
      profile_image:
        "https://lh3.googleusercontent.com/a-/AOh14GiIetx3xTs3PrdMykjMgdjzNkl57bDELYJ85jYU=k-s256",
      display_name: "The Blind Hawk",
      link: "https://stackoverflow.com/users/16306754/the-blind-hawk",
    },
    is_answered: false,
    view_count: 2,
    answer_count: 0,
    score: 0,
    last_activity_date: 1663063301,
    creation_date: 1663063301,
    question_id: 73701040,
    content_license: "CC BY-SA 4.0",
    link: "https://stackoverflow.com/questions/73701040/is-an-unrendered-video-element-less-heavy",
    title: "is an &quot;unrendered&quot; video element less heavy",
  },
];

export const Home = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
      );

      const data = await response.json();
      console.log({ data });
      setApiError("");
      setIsLoading(false);

      return data.items;
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
      setApiError("Unable to retrieve Questions!");
    }
  };

  const handleOnClick = async () => {
    // const result = await getQuestions();
    setAllQuestions(items);
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
