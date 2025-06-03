import { memo } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSearchParams } from 'react-router-dom';
import { getSeasons } from '../../../../api/seasons/queries';

const IconButtonItem = styled(IconButton)(() => ({
  fontSize: 'large',
  color: '#0072a7',
  '&:hover': {
    color: '#000',
    backgroundColor: '#fff',
  },
}));

export interface SelectSeasonProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectSeason = ({ value, onChange }: SelectSeasonProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = getSeasons();

  const seasonFromUrl = searchParams.get('season') || '';
  const currentValue = value ?? seasonFromUrl;

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue); // controlled mode
    } else {
      searchParams.set('season', newValue); // uncontrolled mode
      setSearchParams(searchParams);
    }
  };

  const handleArrowClick = (direction: 'prev' | 'next') => {
    const current = Number(currentValue);
    const newSeason = direction === 'prev' ? current - 1 : current + 1;

    const newValue = newSeason.toString();

    if (onChange) {
      onChange(newValue);
    } else {
      searchParams.set('season', newValue);
      setSearchParams(searchParams);
    }
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (isError || !data) return <h3>Error loading seasons</h3>;

  return (
    <Stack direction='row' spacing={2}>
      <IconButtonItem
        disabled={Number(currentValue) <= data[data.length - 1].id}
        onClick={() => handleArrowClick('prev')}
      >
        <KeyboardArrowLeftIcon />
      </IconButtonItem>
      <FormControl fullWidth size='small'>
        <Select
          labelId='season-label'
          id='season-select'
          value={currentValue || ''}
          onChange={handleChange}
        >
          {data.map((season: any) => (
            <MenuItem key={season.id} value={String(season.id)}>
              {season.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconButtonItem
        disabled={Number(currentValue) >= data[0].id}
        onClick={() => handleArrowClick('next')}
      >
        <KeyboardArrowRightIcon />
      </IconButtonItem>
    </Stack>
  );
};

export default memo(SelectSeason);
