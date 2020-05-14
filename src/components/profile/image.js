import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ event }) => {
  const imageurl = event
    ? `${API}/event/photo/${event._id}`
     :"data:image/png;base64,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"
  return (
    <div className="thumbnail">
      <span className="faded faded-left faded-right">
      <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className=""
      />
      </span>
    </div>
  );
};

export default ImageHelper;