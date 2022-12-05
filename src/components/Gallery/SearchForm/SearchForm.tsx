import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form";
import { PERSON_GENDER, PERSON_STATUS } from '../../../types';

const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

// type ChangeTypeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>  | SelectChangeEvent<string>
// type Options = {
//     defaultValues?: Record<string, string>
//     rules?: Record<string, Record<string, string | number | boolean>>
// }
// const defaultValues = { name: '', status: PERSON_STATUS.ALL, gender: PERSON_GENDER.ALL}
// const rules:Record<string, Record<string, string | number | boolean>> = {name: {minLength: 3}}


// const useForm1 = (options: Options) => {
//     const [values, setValue] = useState(options.defaultValues || {});
//     const [errors, setError] = useState<Record<string, {message: string, type: string}[]>>( {})
   
//     const generateOnChange = (fieldName: string) => (event: ChangeTypeEvent) => {
//         setValue(prev => ({...prev, [fieldName]: event.target.value}))
//         Object.entries(rules[fieldName]).forEach(([currentType, value]) => {
//             if(currentType === 'minLength') {
//                 if(event.target.value.length < value) {
//                     setError(prev => ({...prev, [fieldName]: [{message: 'Short name', type: currentType}]}))
//                 } else {
//                     setError(prev => {
//                         console.log(prev[fieldName].filter(({type}) => type !== currentType))
//                         return {...prev, [fieldName]: prev[fieldName].filter(({type}) => type !== currentType)}
//                     } )
//                 }
//             }
//         })
       
//     } 

//     const register = (name: string) => ({
//         value: values[name],
//         onChange: generateOnChange(name),
//         name,
//         // error: Boolean(errors[name]?.length),
//         // helperText: errors[name]?.[0] ? errors[name][0].message : ''
//     })

//     return {
//         register
//     }
// }

const schema = yup.object({
    name: yup.string().required().min(3)
}).required();

export const SearchForm = () => {

    const { register, control, handleSubmit } = useForm({
        defaultValues: { name: '', status: PERSON_STATUS.ALL, gender: PERSON_GENDER.ALL },
        resolver: yupResolver(schema),
    });

    const formSubmit = (data: {
        name: string;
        status: string;
        gender: string;
    }) => {
        console.log(data)
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