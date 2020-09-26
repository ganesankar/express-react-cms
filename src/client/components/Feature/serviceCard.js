import React from "react";
import { connect } from "react-redux";

const ServiceCard = ({ user, openUserView, key }) => {
  let name = "";

  if (user && user.basic) {
    name = user.basic.find((x) => x.field === "fName").val || "";
  }

  return (
    <>
      <div class="col-lg-4 mb-5 mb-lg-0">
        <div class="display-4 text-primary mb-2">
          <i class="fab fa-connectdevelop"></i>
        </div>
        <h4 class="h5"> {name || ""}</h4>
        <p>
          We strive to figure out ways to help your audience grow through all
          platforms.
        </p>
      </div>
    </>
  );
};

export default connect((state) => ({}), {})(ServiceCard);
