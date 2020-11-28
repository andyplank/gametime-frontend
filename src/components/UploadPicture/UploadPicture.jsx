import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import "./UploadPicture.css"


const UploadPicture = (props) => {
  const [picture, setPicture] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [pictureObj, setPictureObj] = useState([]);
  const { label } = props;

  function handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    setPicture(btoa(binaryString));
  }
  
  const onDrop = (pic) => {
    setPictureObj(pic);
    if(pic.length > 0){
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(pic[0]);
      setShowButtons(true);
    }
    else{
      setShowButtons(false);
    }
  }

  const onSavePicture = () => {
    const {savePicture, hideModal} = props;
    savePicture({picture: picture, name: pictureObj[0].name});
    setPictureObj([]);
    setShowButtons(false);
    if(hideModal){
      hideModal();
    }
  }

  return (
    <div style={{textAlign:"center"}}>
      {pictureObj.length === 0 &&
        (
          <ImageUploader
            withIcon={false}
            onChange={onDrop}
            imgExtension={[".jpg"]}
            maxFileSize={5242880}
            singleImage
            buttonText={label || "Edit Picture"}
            withLabel={false}
            withPreview={false}
          />
        )
      }
      {
        showButtons &&
        ( 
          <>
            <Button 
              className="picture-button"
              variant="contained" 
              color="primary"
              onClick={() => onSavePicture()}
            >
              Save
            </Button>
            <p>
              File Name: 
              {pictureObj[0].name}
            </p>
          </>
        )
      }
    </div>
  )
}

UploadPicture.propTypes = {
  savePicture: PropTypes.func.isRequired,
  hideModal: PropTypes.func,
  label: PropTypes.string
};

UploadPicture.defaultProps = {
  hideModal: null,
  label: null
}

export default UploadPicture;
