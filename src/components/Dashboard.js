import { connect } from "react-redux";

const Dashboard = (props) => {
  console.log(props);

  return (
  <div>
    <h3>Dashboard</h3>
    <ul>
      {props.pollIds.map((id) => (
        <li key={id}>
          <div>Poll ID: {id}</div>
        </li>
      ))}
    </ul>
  </div>
  );
};

const mapStateToProps = ({ polls }) => (
  {
    pollIds: Object.keys(polls)
  }
);

export default connect(mapStateToProps)(Dashboard);