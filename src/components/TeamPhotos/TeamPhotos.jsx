/* eslint-disable */
import React, { useState, useEffect } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import downloadPicture from '../../utils/photos/photos'
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import './TeamPhotos.scss';

const p =  [
    {
        file_id: 0,
        name: "1",
        url: "https://i.picsum.photos/id/649/200/300.jpg?hmac=3hfKZ0fzc7Ie_jSDrRCLD-bO3e71sZ_5xyZmJQXyNFg",
        active: true
    },
    {
        file_id: 1,
        name: "2",
        url: "https://i.picsum.photos/id/567/200/300.jpg?hmac=ntGyo7HM-vKGZw14bMSyWRWvUmbWZgtDpkOI_RwUT6A",
        active: true
    },
    {
        file_id: 2,
        name: "3",
        url: "https://i.picsum.photos/id/993/200/300.jpg?hmac=wwmtancuL0E4SpM9dBnkL-0sXQCflrwn9mJZgo0GNKo",
        active: true
    },
    {
        file_id: 3,
        name: "2",
        url: "https://i.picsum.photos/id/314/200/300.jpg?hmac=JrR8RW6cKgMfQOxlavDFHrFShwcnB_nuYpi1FWAzsgU",
        active: true
    },
    {
        file_id: 4,
        name: "2",
        url: "https://i.picsum.photos/id/1029/200/300.jpg?hmac=VpePgDBTGFZYhRTeOD9o6nCvZB_01SrIHCMMkoZal_A",
        active: true
    },
    {
        file_id: 5,
        name: "2",
        url: "https://i.picsum.photos/id/947/200/300.jpg?hmac=xWi3fTvb1sKlC9ahIla_xr0F3Bjq9UIpXx19e7EMG4o",
        active: true
    },
    {
        file_id: 6,
        name: "2",
        url: "https://picsum.photos/200/300",
        active: true
    },
]

 
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
	function selector(store) {
		return {
            permissionLevel: store.user.teams[store.status.selected_team] 
                ? store.user.teams[store.status.selected_team].permission_level 
                : 0,
            team_id: store.user.teams[store.status.selected_team]
                ? store.user.teams[store.status.selected_team].team_id 
                : 0
		};
	}	
    
    const state = useSelector(selector);
    const classes = useStyles();
    const [photos, setPhotos] = useState(p);
    const [toDelete, setToDelete] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    const handleDelete = (photo) => {
        setPhotos(photos.filter(p => p.file_id !== photo.file_id));
        setShowDelete(false);
    }


    const PhotoRemoveModal = () => {
        const removeMsg = 'Are you sure you want to remove this photo?';
        return (
            <Modal
                show={showDelete}
                onHide={() => setShowDelete(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title>Remove Team Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {removeMsg}
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor:'red'}}variant="contained" color="primary" onClick={() => setShowDelete(false)}>No</Button>
                &nbsp;
                <Button variant="contained" color="primary" onClick={() => handleDelete(toDelete)}>Yes</Button>
            </Modal.Footer>
            </Modal>
        )
    }
    
    return (
        <div className="fill-vert gallery">
            <div>
                <PhotoRemoveModal/>
                <GridList cellHeight={160} cols={3}>
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
                                            onClick={() => downloadPicture(tile)}
                                        >
                                            <GetAppIcon />
                                        </IconButton>
                                        <IconButton 
                                            className={classes.icon} 
                                            onClick={() => { 
                                                setShowDelete(true); 
                                                setToDelete(tile)
                                            }}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
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
    );
}

export default TeamPhotos;

