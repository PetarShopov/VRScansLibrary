import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
    formGroup: {
        overflow: 'auto',
        flexWrap: 'nowrap',
        paddingLeft: '10px',
    },
    element: {
        width: '100%',
    },
    icon: {
        height: 20,
    },
}));

const CustomCheckboxWithLabel = withStyles({
    root: {
        color: 'black',
        '&$checked': {
            color: 'black',
        },
    },
    checked: {},
})((props) => <Checkbox color='default' onChange={props.onChange} />);

export default function CheckboxFilter(props) {
    const classes = useStyles();
    const { items, label, handleChange } = props;
    const [expand, setExpand] = useState(true);
    const getFormGroupStyles = (expand) => {
        if (expand) {
            return {
                height: 200,
                marginTop: 10,
            }
        } else {
            return {
                height: 0,
                marginTop: 0,
            }
        }
    }

    return (
        <div>
            <div className={classes.headerWrapper} onClick={() => setExpand(!expand)}>
                <div className={classes.header}>{label}</div>
                {expand ? <KeyboardArrowUpIcon className={classes.icon} /> : <KeyboardArrowDownIcon className={classes.icon} />}
            </div>
            <FormGroup className={classes.formGroup} style={getFormGroupStyles(expand)}>
                {items.map((item, index) => {
                    return (
                        <FormControlLabel
                            key={index}
                            className={classes.element}
                            control={<CustomCheckboxWithLabel onChange={(e) => {
                                handleChange(e.target.checked, item.id)
                            }} />}
                            label={item.name}
                        />
                    )
                })}
            </FormGroup>
        </div>
    );
}

CheckboxFilter.propTypes = {
    label: PropTypes.string,
    items: PropTypes.array,
    handleChange: PropTypes.func,
}