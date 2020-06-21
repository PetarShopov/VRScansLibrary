import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    itemWrapper: {
        border: '1px solid #d3d3d3',
        padding: '10px',
        width: '24%',
        margin: '0px 0px 20px 0px',
        boxSizing: 'border-box',
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    image: {
        maxWidth: '50%',
    },
    name: {
        fontWeight: 'bold',
    }
}));

export default function VRScanCard(props) {
    const classes = useStyles();
    const { material, manufacturers } = props;

    return (
        <div className={`${classes.itemWrapper} vrscanItem`}>
            <div className={classes.imageWrapper}>
                <img className={classes.image} src={material.thumb} alt={material.name}></img>
            </div>
            <div className={classes.name}>{material.name}</div>
            <div>{manufacturers[material.manufacturerId]}</div>
            <div>{material.fileName}</div>
        </div>
    );
}

VRScanCard.propTypes = {
    material: PropTypes.object,
    manufacturers: PropTypes.object,
}