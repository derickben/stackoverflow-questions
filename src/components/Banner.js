import "./Banner.css";

const Banner = (props) => {
  return (
    <div className="container__banner">
      <h1 className="title">
        <span className="title1">Stack</span>
        <span className="title2">Overflow</span>
      </h1>
      <p className="subTitle">Get questions from Stackoverflow!</p>
      <div className="buttonWrapper">
        <button
          className="button"
          onClick={props.handleOnClick}
          disabled={props.isDisabled}
        >
          {props.isLoading ? "LOADING ..." : "GET QUESTIONS"}
        </button>
      </div>
    </div>
  );
};

export default Banner;
