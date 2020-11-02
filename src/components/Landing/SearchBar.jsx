import React, {useEffect} from 'react';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Button, InputGroup} from 'react-bootstrap';

import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const SearchBar = () => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
  
    const refresh = () => {
      (async () => {
        await sleep(10000); // For demo purposes.
        const countries = [
          { id: '1234', label: 'San Marcos Lacrosse' },
          { id: '4567', label: 'LaPorte Badmitten' }
        ]; 
  
        setOptions(countries);
      })();
    }
  
    useEffect(() => {
      refresh();
    }, [])

    return (
      <InputGroup className="d-flex">
        <Autocomplete
          id="team-search-bar"
          className="grow"
          open={open}
          onOpen={() => {
                        setOpen(true);
                    }}
          onClose={() => {
                        setOpen(false);
                    }}
          getOptionLabel={(option) => option.label}
          options={options}
          loading={loading}
          renderOption={(option) => (
            <>
              {option.label}
            </>
                    )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for your team"
              variant="outlined"
              InputProps={{
                    ...params.InputProps,
                    className:"search-bar",
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                    }}
            />
            )}
        />
        <InputGroup.Append>
          <Button variant="outline-primary" className="search-button">
            {' Go '}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
}

export default SearchBar;