const MyParagraph = (props) => {
    console.log('MyParagraph reevaluated')
  return <p>{props.children}</p>;
};

export default MyParagraph;
