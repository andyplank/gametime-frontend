/* eslint-disable */
import React, { useEffect, useState } from "react";
import ImageUploader from "react-images-upload";
import Button from '@material-ui/core/Button';
import "./UploadPicture.css"


const UploadPicture = (props) => {
  const [picture, setPicture] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [pictureObj, setPictureObj] = useState(null);

  function _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    setPicture(btoa(binaryString));
  }
  
  const onDrop = (picture) => {
    console.log("ondrop", picture)
    setPictureObj(picture);
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

  const onSavePicture = () => {
    props.savePicture(picture);
    setPictureObj(null);
    setShowButtons(false);
  }

  return (
    <div style={{textAlign:"center"}}>
      {!pictureObj &&
        <ImageUploader
          withIcon={false}
          onChange={onDrop}
          imgExtension={[".jpg"]}
          maxFileSize={5242880}
          singleImage={true}
          buttonText="Edit Picture"
          withLabel={false}
          withPreview={false}
        />
      }
      {
        showButtons &&
          <>
            <Button 
              className="picture-button"
              variant="contained" 
              color="primary"
              onClick={() => onSavePicture()}
            >
              Save
            </Button>
            <p>File Name: {pictureObj[0].name}</p>
          </>
      }

    </div>
  )
}

export default UploadPicture;
