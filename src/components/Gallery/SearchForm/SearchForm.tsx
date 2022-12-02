import { Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChangeEventHandler, useState } from 'react';
import { PERSON_GENDER, PERSON_STATUS } from '../../../types';

const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

export const SearchForm = () => {
    const [nameField, setNameField] = useState<String>('');
    const [loading, setIsLoading] = useState(false);
    const [statusField, setStatusField] = useState<String>(PERSON_STATUS.ALL);
    const [genderField, setGenderField] = useState<String>(PERSON_GENDER.ALL);
    const [error, setError] = useState({
        isError: false,
        message: '',
    })

    const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameField(event.target.value);
        setError({
            isError: false,
            message: '',
        })
    }

    const changeStatusField = (event: SelectChangeEvent<String>, child: React.ReactNode) => {
        setStatusField(event.target.value);
    }

    const changeGenderField = (event: SelectChangeEvent<String>, child: React.ReactNode) => {
        setGenderField(event.target.value);
    }

    const searchFormSubmit = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false)
        }, 2000);
        if (!nameField.length) {
            setError({
                isError: true,
                message: 'Enter name',
            })
        }
    }

    return (
        <Box component="form">
            <TextField
                error={error.isError}
                id="person-name"
                label="Person name"
                defaultValue=""
                name='Name'
                value={nameField}
                onChange={changeNameHandler}
                helperText={error.message}
            />

            <InputLabel id="person-status-label">Status</InputLabel>
            <Select
                labelId="person-status-label"
                id="person-status"
                name='Status'
                defaultValue={ PERSON_STATUS.ALL }
                MenuProps={ MenuProps }
                sx={{ width: 300, marginBottom: 2 }}
                value={statusField}
                onChange={changeStatusField}
            >
                {Object.values(PERSON_STATUS).map((status) => <MenuItem value={ status } key={ status }>{ status }</MenuItem>)}
            </Select>

            <InputLabel id="person-gender-label">Gender</InputLabel>
            <Select
                labelId="person-gender-label"
                id="person-gender"
                name='Gender'
                defaultValue={ PERSON_GENDER.ALL }
                MenuProps={ MenuProps }
                sx={{ width: 300, marginBottom: 2 }}
                value={genderField}
                onChange={changeGenderField}
            >
                {Object.values(PERSON_GENDER).map((gender) => <MenuItem value={ gender } key={ gender }>{ gender }</MenuItem>)}
            </Select>
            <LoadingButton loading={loading} variant="outlined" onClick={searchFormSubmit}>
                Submit
            </LoadingButton>
            {/* <Button type='submit'>Show</Button> */}
        </Box>
    )
}