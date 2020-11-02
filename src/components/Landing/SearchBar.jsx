import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputGroup} from 'react-bootstrap';

import CircularProgress from '@material-ui/core/CircularProgress';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
const SearchBar = () => {
  const [value, setValue] = useState(null);  
  const [inputValue, setInputValue] = useState('');
  const [teamId, setTeamID] = useState('');  
  const [open, setOpen] = useState(false);

  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  const refresh = () => {
    (async () => {
      await sleep(100); // For demo purposes.
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
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if(newValue && newValue.id !== undefined){
            setTeamID(newValue.id)
          }
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={(option) => option.label !== undefined ? option.label : ''}
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
                  {loading ? <span className="pr-3"><CircularProgress color="inherit" size={20} /></span> : null}
                </>
              ),
            }}
          />
          )}
      />
      <InputGroup.Append>
        <Link to={`${teamId}/home`} className="no-link btn btn-outline-primary d-flex align-items-center">
          {' Go '}
        </Link>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default SearchBar;
