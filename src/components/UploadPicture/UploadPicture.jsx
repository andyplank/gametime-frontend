/* eslint-disable */
import React, { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";

const UploadPicture = (props) => {
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    console.log("useffect called");
    //call props function here to set picture
  }, [picture])

  function _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    setPicture(btoa(binaryString));
  }
  
  const onDrop = (picture) => {
    if(picture.length > 0){
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(picture[0]);
    }
  }

  return (
    <div>
      <ImageUploader
          withIcon={false}
          onChange={onDrop}
          imgExtension={[".jpg"]}
          maxFileSize={5242880}
          singleImage={true}
          buttonText="Edit Picture"
          withLabel={false}
          withPreview={true}
      />
    </div>
  )
}

export default UploadPicture;
