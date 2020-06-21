import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilterService from '../services/filterService';
import CheckboxFilter from './filters/CheckboxFilter';
import ColorFilter from './filters/ColorFilter';
import VRScansContext from '../VRScansContext';
import { ADD_TYPE, REMOVE_TYPE, ADD_COLOR, REMOVE_COLOR, ADD_TAG, REMOVE_TAG } from '../actions/actionTypes';

const useStyles = makeStyles((theme) => ({
    divider: {
        margin: '20px 0px',
        borderBottom: '1px solid black',
    },
}));

export default function LeftsideMenu() {
    const classes = useStyles();
    const dispatch = useContext(VRScansContext);
    const [types, setTypes] = useState([]);
    const [colors, setColors] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        FilterService.getAllFilters().then((filters) => {
            setTypes(filters[0]);
            setColors(filters[1]);
            setTags(filters[2]);
        })
    }, []);

    const handleTypeFilterChange = (checked, id) => {
        if (checked) {
            dispatch({ type: ADD_TYPE, payload: id })
        } else {
            dispatch({ type: REMOVE_TYPE, payload: id })
        }
    }

    const handleColorFilterChange = (checked, id) => {
        if (checked) {
            dispatch({ type: ADD_COLOR, payload: id })
        } else {
            dispatch({ type: REMOVE_COLOR, payload: id })
        }
    }

    const handleTagFilterChange = (checked, id) => {
        if (checked) {
            dispatch({ type: ADD_TAG, payload: id })
        } else {
            dispatch({ type: REMOVE_TAG, payload: id })
        }
    }

    const renderMaterialsFilter = () => {
        return (
            <CheckboxFilter
                label={'MATERIAL TYPE'}
                items={types}
                handleChange={handleTypeFilterChange}
            />
        )
    }

    const renderColorsFilter = () => {
        return (
            <ColorFilter
                label={'MATERIAL COLOR'}
                items={colors}
                handleChange={handleColorFilterChange}
            />
        )
    }

    const renderTagsFilter = () => {
        return (
            <CheckboxFilter
                label={'TAGS'}
                items={tags}
                handleChange={handleTagFilterChange}
            />
        )
    }

    const renderDivider = () => {
        return (
            <div className={classes.divider}></div>
        )
    }

    return (
        <div>
            {renderMaterialsFilter()}
            {renderDivider()}
            {renderColorsFilter()}
            {renderDivider()}
            {renderTagsFilter()}
            {renderDivider()}
        </div >
    );
}
