import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Typography from "../Typography";

const Togglable = React.forwardRef((props, ref) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const hideWhenVisible = { display: loginVisible ? "none" : "" };
  const showWhenVisible = { display: loginVisible ? "" : "none" };

  const toggleVisibility = () => {
    setLoginVisible(!loginVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Typography buttonType="toggle" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Typography>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Typography buttonType="cancel" onClick={toggleVisibility}>
          Cancel
        </Typography>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
