import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>My home page</h1>{" "}
      <p>
        <Link to="/products">The list of products</Link>
      </p>
    </>
  );
};

export default HomePage;
