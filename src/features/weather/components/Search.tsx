import React, { useState, useMemo, useEffect, ChangeEvent } from 'react';
import styled from '@emotion/styled';

import Autocomplete from '@material-ui/lab/Autocomplete';

import { darken } from 'polished';
import { TextField, Grid, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';

import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { useDispatch, useSelector } from 'react-redux';
import { setMyLocation, updatePlace, setLoading, addHistory } from '../weather.actions';
import { PlaceDto } from '../PlaceDto';
import RootState from '../../../RootState';

const Wrapper = styled('div')`
  display: flex;
  width: 100%;
  background-color: ${(props: any) => (props.theme ? darken(0.0, props.theme.colors.background) : '')};
  color: ${(props: any) => props.theme.colors.onBackground};
`;

const AutocompleteStyled = styled(Autocomplete)`
  padding: 0 10px;
  flex: 1;
`;

const LocationOnIconStyled = styled(LocationOnIcon)`
  margin-right: 10px;
`;

const autocompleteService: any = { current: null };

const Search = () => {
  const dispatch = useDispatch();
  const [history] = useSelector((state: RootState) => [state.weather.history]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<PlaceDto[]>(history);

  const handleHome = () => {
    dispatch(setLoading());
    dispatch(setMyLocation());
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (e: any, val: any) => {
    if (!val || !val.place_id) {
      return;
    }
    dispatch(setLoading());
    dispatch(updatePlace({ id: val.id, description: val.description, placeId: val.place_id }));
    dispatch(addHistory(val));
  };

  const fetch = useMemo(
    () =>
      throttle((input, callback) => {
        if (!autocompleteService.current && (window as any).google) {
          autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
        }
        autocompleteService.current.getPlacePredictions(input, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(history);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceDto[]) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch, history]);

  return (
    <Wrapper>
      <IconButton aria-label="home" onClick={handleHome}>
        <HomeIcon />
      </IconButton>
      <AutocompleteStyled
        onChange={handleSelect}
        id="google-map-autocomplete"
        getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
        autoHighlight
        filterOptions={x => x}
        options={options}
        autoComplete
        includeInputInList
        freeSolo
        renderInput={params => (
          <TextField
            style={{ marginTop: 8 }}
            {...params}
            placeholder="Show me the weather in... city, zip, or place"
            fullWidth
            onChange={handleChange}
          />
        )}
        renderOption={option => {
          const matches = option.structured_formatting.main_text_matched_substrings;
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map(match => [match.offset, match.offset + match.length]),
          );
          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIconStyled />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
      />
    </Wrapper>
  );
};

export default Search;
