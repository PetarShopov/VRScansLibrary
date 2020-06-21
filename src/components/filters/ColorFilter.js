import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CustomCheckbox from '../reusable/CustomCheckbox';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
    headerWrapper: {
        fontWeight: 'bold',
        lineHeight: '20px',
        cursor: 'pointer',
        userSelect: 'none',
        display: 'flex',
    },
    header: {
        flex: '1',
    },
    itemsWrapper: {
        display: 'flex',
        flexFlow: 'wrap',
        marginRight: '40px',
        paddingLeft: '5px',
    },
    element: {
        width: '30px',
        height: '30px',
        margin: '5px',
    },
    icon: {
        height: '20px',
    },
}));

export default function ColorFilter(props) {
    const classes = useStyles();
    const { items, label, handleChange } = props;
    const [expand, setExpand] = useState(true);
    const getItemsWrapperStyles = (expand) => {
        if (expand) {
            return {
                height: 'auto',
                visibility: 'visible',
                marginTop: 10,
                maxWidth: '210px',
            }
        } else {
            return {
                height: 0,
                visibility: 'hidden',
                marginTop: 0,
                maxWidth: '210px',
            }
        }
    }

    return (
        <div>
            <div className={classes.headerWrapper} onClick={() => setExpand(!expand)}>
                <div className={classes.header}>{label}</div>
                {expand ? <KeyboardArrowUpIcon className={classes.icon} /> : <KeyboardArrowDownIcon className={classes.icon} />}
            </div>
            <div className={classes.itemsWrapper} style={getItemsWrapperStyles(expand)}>
                {items.map((item, index) => {
                    return (
                        <CustomCheckbox key={index} item={item} handleChange={handleChange} />
                    )
                })}
            </div>
        </div>
    );
}


ColorFilter.propTypes = {
    label: PropTypes.string,
    items: PropTypes.array,
    handleChange: PropTypes.func,
}