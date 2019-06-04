import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Create an alert pop-up object
// Can consume props form the notifyUser action
const Alert = ({ alert }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map(alert => (
    // Hacky way to prevent remove the alert with javascript handle from crashing the program
    <div key={alert.id}>
      <div
        className={`alert alert-${
          alert.messageType
        } alert-dismissible fade show`}
        role="alert"
        style={{ width: "50%", margin: "auto", marginTop: "20px" }}
      >
        <h4 className="alert-heading">{alert.reason}</h4>
        {alert.message}
        <hr />
        <p class="mb-0">
          This alert will automatically go away after <strong>5 seconds</strong>
        </p>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  ));

Alert.propTypes = {
  alert: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
