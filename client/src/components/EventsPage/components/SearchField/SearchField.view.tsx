import React, { useRef } from 'react';
import { SearchFieldViewComponent } from './SearchField.types';
import { makeStyles, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useClickOutside } from '../../../shared/hooks';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        flex: 1,
        maxWidth: 450,
        height: 'fit-content',
        margin: 8,
        padding: '8px 16px'
    }
});

export const SearchFieldView: SearchFieldViewComponent = ({
    onInputChange,
    onChange,
    options
}) => {
    const classes = useStyles();
    const ref = useRef<HTMLInputElement>();

    useClickOutside(ref, () => {
        ref.current?.blur();
    });

    return (
        <Paper className={classes.root}>
            <Autocomplete
                ref={ref}
                id={'place-search-field'}
                options={options}
                onInputChange={(_, value) => onInputChange(value)}
                onChange={(_, v) => onChange(v)}
                getOptionLabel={(option) => option.name}
                noOptionsText="Inga resultat"
                renderInput={(params) => (
                    <TextField {...params} fullWidth placeholder="Sök plats" />
                )}
            />
        </Paper>
    );
};
