import { connect } from "react-redux";

const Custom404 = () => {
  return (
    <div className="page-wrapper inner">
      <h1>Error Encountered</h1>
      <p>This poll does not exist.</p>
    </div>
  );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Custom404);