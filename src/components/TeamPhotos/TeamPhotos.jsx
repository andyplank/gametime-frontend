/* eslint-disable */
import React, { useState } from "react";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import downloadPicture from '../../utils/photos/photos'
import './TeamPhotos.scss';

const photos =  [
    {
        file_id: 0,
        name: "1",
        url: "https://picsum.photos/id/1018/1000/600/",
        active: false
    },
    {
        file_id: 1,
        name: "2",
        url: "https://picsum.photos/id/1018/1000/600/",
        active: false
    },
    {
        file_id: 2,
        name: "3",
        url: "https://picsum.photos/id/1018/1000/600/",
        active: false
    },
    {
        file_id: 3,
        name: "2",
        url: "https://picsum.photos/id/1018/1000/600/",
        active: false
    },
    {
        file_id: 4,
        name: "2",
        url: "https://picsum.photos/id/1018/1000/600/",
        active: false
    },
    {
        file_id: 5,
        name: "2",
        url: "https://picsum.photos/id/1018/1000/600/",
        active: false
    },
    {
        file_id: 6,
        name: "2",
        url: "https://picsum.photos/id/1018/1000/600/",
        active: false
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
    const classes = useStyles();

    return (
        <div className="fill-vert gallery">
            <div>
                <GridList cellHeight={160} cols={3}>
                    {photos.map((tile) => (
                            <GridListTile key={tile.file_id}>
                                <img src={tile.url}/>
                                <GridListTileBar
                                    title={tile.title}
                                    titlePosition="bottom"
                                    actionIcon={
                                    <IconButton 
                                        className={classes.icon}
                                        onClick={() => downloadPicture(tile)}
                                    >
                                        <GetAppIcon />
                                    </IconButton>
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

