/* eslint-disable */
import React, { useState, useEffect } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import './TeamPhotos.scss';

const p =  [
    {
        file_id: 0,
        name: "1",
        url: "https://i.picsum.photos/id/649/200/300.jpg?hmac=3hfKZ0fzc7Ie_jSDrRCLD-bO3e71sZ_5xyZmJQXyNFg",
        active: false
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
        active: false
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

const ApprovePhotos = (props) => {
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
    const [toApprove, setToApprove] = useState({});
    const [showApprove, setShowApprove] = useState(false);

    const handleApprove = (photo) => {
        // call endpoint to set photo active
        setPhotos(photos.filter(p => p.file_id !== photo.file_id));
        setShowApprove(false);
    }

    const PhotoApproveModal = () => {
        const msg = 'Approve this photo?';
        return (
            <Modal
                show={showApprove}
                onHide={() => setShowApprove(false)}
            >
            <Modal.Header closeButton>
                <Modal.Title>Approve Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {msg}
            </Modal.Body>
            <Modal.Footer>
                <Button style={{backgroundColor:'red'}}variant="contained" color="primary" onClick={() => setShowApprove(false)}>No</Button>
                &nbsp;
                <Button variant="contained" color="primary" onClick={() => handleApprove(toApprove)}>Yes</Button>
            </Modal.Footer>
            </Modal>
        )
    }
    
    return (
        <div className="fill-vert gallery">
            <div>
                <PhotoApproveModal/>
                <GridList cellHeight={160} cols={3}>
                    {photos.map((tile) => !tile.active && (
                        <GridListTile key={tile.file_id}>
                            <img src={tile.url}/>
                            <GridListTileBar
                                title={tile.title}
                                titlePosition="bottom"
                                actionIcon={
                                    <>
                                        <IconButton 
                                            className={classes.icon} 
                                            onClick={() => { 
                                                setShowApprove(true); 
                                                setToApprove(tile)
                                            }}
                                        >
                                            <CheckIcon />
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

export default ApprovePhotos;

