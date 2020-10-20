/* eslint-disable */
import React, { useState } from "react";
import ImageUploader from "react-images-upload";

const UploadPicture = (props) => {
    const [picture, setPicture] = useState(null);

    function _handleReaderLoaded(readerEvt) {
      let binaryString = readerEvt.target.result;
      console.log(btoa(binaryString));
    }
    const onDrop = (picture) => {
      console.log(picture[0].name);
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(picture[0]);
      setPicture(picture)
    }

    return (
        <ImageUploader
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg"]}
            maxFileSize={5242880}
            singleImage={true}
            buttonText="Choose Photo"
            label="Max file size: 5mb, accepted: jpg"
            withPreview={true}
        />
    )
}

export default UploadPicture;
