import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    header: {
        margin: '10px 0px',
        fontWeight: 'bold',
    },
    itemsWrapper: {
        display: 'flex',
        flexFlow: 'wrap',
        marginRight: 40,
    },
    element: {
        width: 30,
        height: 30,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

export default function CustomCheckbox(props) {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    const { handleChange, item } = props;

    const handleCheck = () => {
        const itemChecked = !checked;
        setChecked(itemChecked);
        handleChange(itemChecked, item.id);
    }

    const getStyles = (itemColor, checked) => {
        let borderColor = 'white';
        let color = 'black';
        if (itemColor === '#FFFFFF') {
            borderColor = '#d3d3d3';
        }
        if (itemColor === '#000000') {
            color = 'white';
        }
        if (checked) {
            borderColor = 'black';
        }
        return {
            border: `1px solid ${borderColor}`,
            backgroundColor: itemColor,
            color,
        };
    }

    return (
        <div
            className={classes.element}
            style={getStyles(item.hex, checked)}
            onClick={handleCheck}
        >
            {checked ? <CheckIcon /> : ''}
        </div>
    );
}

CustomCheckbox.propTypes = {
    item: PropTypes.object,
    handleChange: PropTypes.func,
}