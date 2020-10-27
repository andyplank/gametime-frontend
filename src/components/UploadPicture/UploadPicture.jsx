/* eslint-disable */
import React, { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";
import Button from '@material-ui/core/Button';
import "./UploadPicture.css"


const UploadPicture = (props) => {
  const [picture, setPicture] = useState(null);
  const [showButtons, setShowButtons] = useState(false);

  function _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    setPicture(btoa(binaryString));
  }
  
  const onDrop = (picture) => {
    console.log("ondrop", picture)
    if(picture.length > 0){
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(picture[0]);
      setShowButtons(true);
    }
    else{
      setShowButtons(false);
    }
  }

  return (
    <div style={{textAlign:"center"}}>
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
      {
        showButtons &&
          <>
            <Button 
              className="picture-button"
              variant="contained" 
              color="primary"
              onClick={() => props.savePicture(picture)}
            >
              Save
            </Button>
            &nbsp;
          </>
      }

    </div>
  )
}

export default UploadPicture;
