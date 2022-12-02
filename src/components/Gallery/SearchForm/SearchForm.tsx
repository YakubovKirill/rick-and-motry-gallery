import { Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from "react-hook-form";
import {  useEffect, useState } from 'react';
import { PERSON_GENDER, PERSON_STATUS } from '../../../types';

const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

type ChangeTypeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>  | SelectChangeEvent<string>
type Options = {
    defaultValues?: Record<string, string>
    rules?: Record<string, Record<string, string | number | boolean>>
}
const defaultValues = { name: '', status: PERSON_STATUS.ALL, gender: PERSON_GENDER.ALL}
const rules:Record<string, Record<string, string | number | boolean>> = {name: {minLength: 3}}


const useForm1 = (options: Options) => {
    const [values, setValue] = useState(options.defaultValues || {});
    const [errors, setError] = useState<Record<string, {message: string, type: string}[]>>( {})
   
    const generateOnChange = (fieldName: string) => (event: ChangeTypeEvent) => {
        setValue(prev => ({...prev, [fieldName]: event.target.value}))
        Object.entries(rules[fieldName]).forEach(([currentType, value]) => {
            if(currentType === 'minLength') {
                if(event.target.value.length < value) {
                    setError(prev => ({...prev, [fieldName]: [{message: 'Short name', type: currentType}]}))
                } else {
                    setError(prev => {
                        console.log(prev[fieldName].filter(({type}) => type !== currentType))
                        return {...prev, [fieldName]: prev[fieldName].filter(({type}) => type !== currentType)}
                    } )
                }
            }
        })
       
    } 

    const register = (name: string) => ({
        value: values[name],
        onChange: generateOnChange(name),
        name,
        // error: Boolean(errors[name]?.length),
        // helperText: errors[name]?.[0] ? errors[name][0].message : ''
    })

    return {
        register
    }
}

export const SearchForm = () => {

    // const {register} = useForm({defaultValues, rules});

    const { register, handleSubmit, formState: { errors } } = useForm();

    // const [nameField, setNameField] = useState<String>('');
    // const [loading, setIsLoading] = useState(false);
    // const [statusField, setStatusField] = useState<String>(PERSON_STATUS.ALL);
    // const [genderField, setGenderField] = useState<String>(PERSON_GENDER.ALL);
    // const [error, setError] = useState({
    //     isError: false,
    //     message: '',
    // })

    // const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNameField(event.target.value);
    //     setError({
    //         isError: false,
    //         message: '',
    //     })
    // }

    // const changeStatusField = (event: SelectChangeEvent<String>, child: React.ReactNode) => {
    //     setStatusField(event.target.value);
    // }

    // const changeGenderField = (event: SelectChangeEvent<String>, child: React.ReactNode) => {
    //     setGenderField(event.target.value);
    // }

    // const searchFormSubmit = () => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 2000);
    //     if (!nameField.length) {
    //         setError({
    //             isError: true,
    //             message: 'Enter name',
    //         })
    //     }
    // }

    return (
        <Box component="form" onSubmit={handleSubmit((data) => console.log(data))}>
            <TextField
                id="person-name"
                label="Person name"
                variant='outlined'
                error={ errors.name ? true: false }
                {...register('name', { minLength: 3 })}
            />

            <InputLabel id="person-status-label">Status</InputLabel>
          <Select
                labelId="person-status-label"
                id="person-status"
                defaultValue={ PERSON_STATUS.ALL }
                MenuProps={ MenuProps }
                sx={{ width: 300, marginBottom: 2 }}
                {...register('status')}
            >
                {Object.values(PERSON_STATUS).map((status) => <MenuItem value={ status } key={ status }>{ status }</MenuItem>)}
            </Select>

            <InputLabel id="person-gender-label">Gender</InputLabel>
            <Select
                labelId="person-gender-label"
                id="person-gender"
                defaultValue={ PERSON_GENDER.ALL }
                MenuProps={ MenuProps }
                sx={{ width: 300, marginBottom: 2 }}
                {...register('gender')}
            >
                {Object.values(PERSON_GENDER).map((gender) => <MenuItem value={ gender } key={ gender }>{ gender }</MenuItem>)}
            </Select>
            <Button type='submit'>Show</Button>
        </Box>
    )
}