import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '25px 0px 0px 12px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Search(props) {
    const classes = useStyles();
    let onChange = (event) => {
        props.handleSearch(event.target.value);
    }
    onChange = _.debounce(onChange, 600);
    return (
        <div className={classes.root}>
            <Input
                onChange={(event) => { event.persist(); onChange(event) }}
                className={classes.input}
                placeholder="Search VRscans"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
        </div>
    );
}

Search.propTypes = {
    handleSearch: PropTypes.func,
}