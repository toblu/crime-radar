import React, { useState } from 'react';
import { SearchFieldViewComponent } from './SearchField.types';
import { makeStyles, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        flex: 1,
        maxWidth: 450,
        height: 'fit-content',
        margin: 8,
        padding: '8px 16px',
        zIndex: 2
    },
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        zIndex: 1
    }
});

export const SearchFieldView: SearchFieldViewComponent = ({
    open,
    value,
    onOpen,
    onClose,
    onInputChange,
    onChange,
    options,
    onKeyPress
}) => {
    const classes = useStyles();
    const [renderBackdrop, setRenderBackdrop] = useState(false);
    return (
        <>
            <Paper className={classes.root}>
                <Autocomplete
                    id="place-search-field"
                    open={open}
                    inputValue={value}
                    options={options}
                    onOpen={onOpen}
                    onClose={onClose}
                    onInputChange={(_, value) => onInputChange(value)}
                    onChange={(_, v) => onChange(v)}
                    getOptionLabel={(option) => option.name}
                    noOptionsText="Inga resultat"
                    onFocus={() => setRenderBackdrop(true)}
                    onBlur={() => setRenderBackdrop(false)}
                    blurOnSelect
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            placeholder="Sök plats"
                        />
                    )}
                    onKeyPress={onKeyPress}
                />
            </Paper>
            {renderBackdrop && <div className={classes.backdrop} />}
        </>
    );
};
