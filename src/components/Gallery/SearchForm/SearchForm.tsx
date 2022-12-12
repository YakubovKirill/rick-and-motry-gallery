import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { PERSON_GENDER, PERSON_STATUS } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store';
import { initialState as initialFilterState, setFilter } from '../../../store/slices/galleryFilter';

const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
};

const schema = yup.object({
    name: yup.string()
}).required();

export const SearchForm = () => {
    const filter = useAppSelector((state) => state.filter);
    const { control, handleSubmit, reset, getValues } = useForm({
        defaultValues: { name: filter.name, status: filter.status, gender: filter.gender },
        resolver: yupResolver(schema),
    });
    const dispatch = useAppDispatch()

    const formSubmit = (data: {
        name: string;
        status: string;
        gender: string;
    }) => {
        dispatch(setFilter({
            ...filter,
            ...getValues()
        }));
    }

    const clearFilter = () => {
        reset({ ...initialFilterState })

        dispatch(setFilter({
            ...initialFilterState
        }));
    }

    return (
        <Box component="form" onSubmit={handleSubmit(formSubmit)}>
            <Controller
                control={control}
                name="name"
                render={({formState, field}) =>  <TextField
                    id="person-name"
                    label="Person name"
                    variant='outlined'
                    {...field}
                    helperText={formState.errors.name?.message}
                    error={!!formState.errors.name}
                />}
            />
           
            <InputLabel id="person-status-label">Status</InputLabel>
            <Controller
                control={ control }
                name='status'
                render={({formState, field}) => 
                    <Select
                        labelId="person-status-label"
                        id="person-status"
                        defaultValue={ PERSON_STATUS.ALL }
                        MenuProps={ MenuProps }
                        {...field}
                        sx={{ width: 300, marginBottom: 2 }}
                    >
                        {Object.values(PERSON_STATUS).map((status) => <MenuItem value={ status } key={ status }>{ status }</MenuItem>)}
                    </Select>
            }/>

            <InputLabel id="person-gender-label">Gender</InputLabel>
            <Controller
                control={ control }
                name='gender'
                render={({formState, field}) => 
                    <Select
                        labelId="person-gender-label"
                        id="person-gender"
                        defaultValue={ PERSON_GENDER.ALL }
                        MenuProps={ MenuProps }
                        {...field}
                        sx={{ width: 300, marginBottom: 2 }}
                    >
                        {Object.values(PERSON_GENDER).map((gender) => <MenuItem value={ gender } key={ gender }>{ gender }</MenuItem>)}
                    </Select>
                }
            />
            <Box>
                <Button type='submit'>Show</Button>
                <Button type='button' onClick={clearFilter}>Clear</Button>
            </Box>
        </Box>
    )
}
