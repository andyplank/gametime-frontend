/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import UploadPicture from '../UploadPicture/UploadPicture'
import Feedback from '../Common/Feedback';
import { useSelector } from 'react-redux';
import { getPhotos, uploadPhoto, setPhotoVisibility } from '../../utils/photos/photos'
import './TeamPhotos.scss';

const useStyles = makeStyles((theme) => ({
    titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
      icon: {
        color: 'white',
      },
}));


const TeamPhotos = (props) => {
    const { team_id } = useParams();
	function selector(store) {
        console.log(store.user.teams[store.status.selected_team] );
		return {
            signedIn: store.status.signed_in,
            permissionLevel: store.user.teams[store.status.selected_team] 
                ? store.user.teams[store.status.selected_team].permission_level 
                : 0,
            team_id: team_id
		};
	}	
    
    const state = useSelector(selector);
    const classes = useStyles();
    const [isEmpty, setIsEmpty] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [toRemove, setToRemove] = useState({});
    const [showRemove, setShowRemove] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [label, setLabel] = useState('');
    
    useEffect(() => {
        async function fetchPhotos() {
            const res = await getPhotos(state.team_id)
            setPhotos(res);
            setIsEmpty(res.every(p => !p.active));
		}
        fetchPhotos();
    }, []);

    const handleRemove = async (photo) => {
        //call endpoint to set photo not active
        let apiObj = {
            team_id: state.team_id, //replace with teamId from selector
            file_id: photo.file_id,
            active: false
        }

        const res = await setPhotoVisibility(apiObj);
        setLabel('Success! The photo has been successfully removed.');
        setAlertType(res ? 'success' : 'danger');
        setShowAlert(true);

        const p = photos;
        p.forEach(p => p.file_id === photo.file_id ? p.active = false : p.active = p.active);
        setPhotos(p);
        setShowRemove(false);
        setIsEmpty(p.every(p => !p.active));
    }

    const PhotoRemoveModal = () => {
        const removeMsg = 'Are you sure you want to remove this photo?';
        return (
            <Modal
                show={showRemove}
                onHide={() => setShowRemove(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title>Remove Team Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {removeMsg}
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor:'red'}}variant="contained" color="primary" onClick={() => setShowRemove(false)}>No</Button>
                &nbsp;
                <Button variant="contained" color="primary" onClick={() => handleRemove(toRemove)}>Yes</Button>
            </Modal.Footer>
            </Modal>
        )
    }

    async function savePicture(picture) {
        const saveObj = {
            team_id: state.team_id, //get from selector or params
            picture: `data:image/jpeg;base64,${picture.picture}`,
            name: picture.name,
            active: false,
        }
        //call endpoint to save team photo
        const res = await uploadPhoto(saveObj);
        setLabel('Success! The photo has been sent for approval.');
        setAlertType(res ? 'success' : 'danger');
        setShowAlert(true);
        console.log(saveObj);
    }

    const PhotoUploadModal = () => {
        return (
            <Modal
                show={showUpload}
                onHide={() => setShowUpload(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title>Photo Upload</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UploadPicture 
                    savePicture={savePicture} 
                    hideModal={() => setShowUpload(false)}
                    label="Open"
                />
            </Modal.Body>
            </Modal>
        )
    }
    
    return <div className="fill-vert">
    {
        <>
            <Feedback 
                alertType={alertType}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                label={label}
            />
            {
                state.signedIn &&
                <div className="center">
                    <PhotoUploadModal /> 
                    <IconButton onClick={() => setShowUpload(true)}>
                        <AddCircleOutlineIcon style={{fontSize:60}}/>
                    </IconButton>
                </div>
            }
        </>
    }
    {
        !isEmpty ? (
            <div className="gallery-team">
                <div>
                    <PhotoRemoveModal/>
                    <GridList cellHeight={180} cols={3}>
                        {photos.map((tile) => tile.active && (
                            <GridListTile key={tile.file_id}>
                                <img src={tile.url}/>
                                <GridListTileBar
                                    title={tile.title}
                                    titlePosition="bottom"
                                    actionIcon={
                                        <>
                                            <IconButton 
                                                className={classes.icon}
                                                onClick={() => window.open(tile.url, "_blank")}
                                            >
                                                <GetAppIcon />
                                            </IconButton>
                                            {
                                                state.permissionLevel >= 1 &&
                                                <IconButton 
                                                    className={classes.icon} 
                                                    onClick={() => { 
                                                        setShowRemove(true); 
                                                        setToRemove(tile)
                                                    }}
                                                >
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            }
                                        </>
                                    }
                                    actionPosition="left"
                                    className={classes.titleBar}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        ) 
        : 
        (
            <div className="gallery">
                <h3>There are no available photos at this time for the team.</h3>
            </div>
        )
    }
    </ div>
}

export default TeamPhotos;

