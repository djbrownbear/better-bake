import { connect } from "react-redux";
import Poll from "./Poll";

const Dashboard = (props) => {
  console.log(props);

  return (
  <div>
    <h1>Dashboard</h1>
    <div>
      <ul className="polls-flex">
        {props.pollIds.map((id) => (
          <li key={id} className="poll-item">
            <Poll id={id} />
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

const mapStateToProps = ({ polls }) => (
  {
    pollIds: Object.keys(polls)
  }
);

export default connect(mapStateToProps)(Dashboard);