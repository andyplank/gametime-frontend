import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputGroup } from 'react-bootstrap';

import CircularProgress from '@material-ui/core/CircularProgress';

import landing from '../../utils/landing/landing';

const SearchBar = () => {
  const [value, setValue] = useState(null);  
  const [inputValue, setInputValue] = useState('');
  const [teamId, setTeamID] = useState('');  
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [err, setErr] = useState(false);

  const refresh = async () => {
    const res = await landing(setOptions);
    if(res===false){
      setErr(true);
    }
  }

  useEffect(() => {
    refresh();
  }, [])

  if(err){
    return (
      <div>
        <h4>
          NOT!
        </h4>
      </div>
    );
  }

  return (
    <InputGroup className="d-flex">
      <Autocomplete
        id="team-search-bar"
        className="grow no-blue"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if(newValue && newValue.team_id !== undefined){
            setTeamID(newValue.team_id)
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
        getOptionLabel={(option) => option.name !== undefined ? option.name : ''}
        options={options}
        loading={loading}
        renderOption={(option) => (
          <>
            {option.name}
          </>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for your team"
            variant="filled"
            InputProps={{
              ...params.InputProps,
              className:"search-bar",
              disableUnderline: true,
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
        <Link
          replace 
          to={teamId!=='' ? `${teamId}/home` : '/'}
          className="no-link justify-content-center btn btn-outline-primary d-flex align-items-center search-button"
        >
          {' Go '}
        </Link>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default SearchBar;
