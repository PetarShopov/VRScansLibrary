import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import VRScansService from '../services/vrScansService';
import ManufacturersService from '../services/manufacturersService';
import Search from './reusable/Search';
import InfiniteScroll from 'react-infinite-scroll-component';
import VRScanCard from './reusable/VRScanCard';
import VRScansContext from '../VRScansContext';
import { UPDATE_SEARCH_TERM } from '../actions/actionTypes';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px',
        justifyContent: 'space-between',
    },
}));

export default function Home(props) {
    const classes = useStyles();
    const dispatch = useContext(VRScansContext);
    const [vrscans, setVrscans] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { types, colors, tags, searchTerm } = props;

    useEffect(() => {
        ManufacturersService.getAll().then((manufacturers) => {
            setManufacturers(manufacturers);
        })
    }, []);

    useEffect(() => {
        VRScansService.getAll(1, 20, searchTerm, types, colors, tags).then((res) => {
            setVrscans(res);
            if (res.length < 10) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

        })
    }, [searchTerm, types, colors, tags]);

    const fetchMoreData = () => {
        let page = Math.ceil(vrscans.length / 10) + 1;
        if (vrscans.length % 10 === 0) {
            VRScansService.getAll(page, undefined, searchTerm, types, colors, tags).then((res) => {
                const all = vrscans.concat(res);
                setVrscans(all);
            });
        } else {
            setHasMore(false);
        }
    };

    const handleSearch = (term) => {
        dispatch({ type: UPDATE_SEARCH_TERM, payload: term })
    }

    return (
        <div className={classes.root}>
            <Search handleSearch={handleSearch} />
            <InfiniteScroll
                dataLength={vrscans.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                className={classes.gridWrapper}
            >
                {vrscans.map(material => {
                    return (
                        <VRScanCard key={material.id} material={material} manufacturers={manufacturers} />
                    )
                })}
            </InfiniteScroll>
        </div>
    );
}

Home.propTypes = {
    types: PropTypes.array,
    colors: PropTypes.array,
    tags: PropTypes.array,
    searchTerm: PropTypes.string,
}