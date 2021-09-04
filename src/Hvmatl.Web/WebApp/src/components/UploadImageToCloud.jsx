import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import LoadingBox from "./LoadingBox";
import { connect, useDispatch } from "react-redux";
import { getImageUrl } from "../store/dispatch/dispatch";
import { IMAGE_UPLOAD_RESET } from "../store/actionType";

function UploadImageToCloud({ getImageUrl, cloudImage }) {
  const [fileImage, setFileImage] = useState("");
  const [imageReader, setImageReader] = useState(null);
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();

  const { loading, imageUrl, success } = cloudImage;

  useEffect(() => {
    if (imageUrl) {
      setImageReader(null);
      setFileImage("");
      setUrl(imageUrl);
    }
    if (success) {
      dispatch({ type: IMAGE_UPLOAD_RESET });
    }
  }, [imageUrl, success, dispatch]);

  const handleChangeImage = (e) => {
    setFileImage(e.target.value);
    const formBodyData = new FormData();
    formBodyData.append("image", e.target.files[0]);
    setImageReader(formBodyData);
  };

  return (
    <div className="article__getURLImage">
      <div className="article__resourceImage">
        <input
          type="file"
          className="article__resourceImage-input"
          value={fileImage}
          onChange={handleChangeImage}
        />
        <Button
          variant={!imageReader ? "secondary" : "primary"}
          disabled={!imageReader ? true : false}
          onClick={() => getImageUrl(imageReader)}
        >
          Upload
        </Button>
      </div>
      {loading ? (
        <LoadingBox />
      ) : (
        <input
          type="text"
          readOnly
          className="article__resultURL"
          placeholder="URL coming out here..."
          value={url}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  cloudImage: state.cloudImage,
});

const mapDispatchToProps = (dispatch) => ({
  getImageUrl: (imageReader) => getImageUrl(dispatch, imageReader),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImageToCloud);
