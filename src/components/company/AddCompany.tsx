
import { addNewCompany } from '@/redux/company/companySlice';
import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography, debounce } from '@mui/material'
import React from 'react'
import parse from 'autosuggest-highlight/parse';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface FormData {
    company_id: string;
    email: string,
    company_name: string,
    description: string,
    location: {
        city: string,
        cordinates: { 
            lat: string,
            lng: string
        }
  }
    user: {
        first_name: string,
        role: string
    }
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyDgVjkwJxokry6jo1PFjv9qnGU8X7mjRGg';

function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
      return;
    }
  
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
  }
  
  const autocompleteService = { current: null };
  
  
  interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
  }
  interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
  }
  interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
  }
  


const AddCompany = ({ open, handleClose }: { open: any, handleClose: any }) => {

    const [value, setValue] = React.useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
    console.log(options,"options value")
    const loaded = React.useRef(false);
  
  
    if (typeof window !== 'undefined' && !loaded.current) {
      if (!document.querySelector('#google-maps')) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
          document.querySelector('head'),
          'google-maps',
        );
      }
    
      loaded.current = true;
    }
    
  
    const fetch = React.useMemo(
      () =>
        debounce(
          (
            request: { input: string },
            callback: (results?: readonly PlaceType[]) => void,
          ) => {
            (autocompleteService.current as any).getPlacePredictions(
              request,
              callback,
            );
          },
          400,
        ),
      [],
    );
  
    
    React.useEffect(() => {
      let active = true;
  
      if (!autocompleteService.current && (window as any).google) {
        autocompleteService.current = new (
          window as any
        ).google.maps.places.AutocompleteService();
      }
      if (!autocompleteService.current) {
        return undefined;
      }
  
      if (inputValue === '') {
        setOptions(value ? [value] : []);
        return undefined;
      }
  
      fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];
  
          if (value) {
            newOptions = [value];
          }
  
          if (results) {
            newOptions = [...newOptions, ...results];
          }
  
          setOptions(newOptions);
        }
      });
  
      return () => {
        active = false;
      };
    }, [value, inputValue, fetch]);
  
    const dispatch = useDispatch<any>();
    const { register, control, handleSubmit, reset } = useForm<FormData>();

    // const handleSave = (formData: FormData) => {
    //     // Check if value is defined and has data
    //     if (value && value.description && value.geometry && value.geometry.location) {
    //         // Populate location data in formData
    //         formData.location = {
    //             city: value.description,
    //             cordinates: {
    //                 lat: value.geometry.location.lat().toString(),
    //                 lng: value.geometry.location.lng().toString()
    //             }
    //         };
    //     }
    
    //     // Dispatch the formData to addNewCompany action
    //     dispatch(addNewCompany(formData));
    //     handleClose();
    // };
    

    const handleSave = (formData: any) => {
        // Check if value is defined and has data
        if (value && value.structured_formatting) {
            // Populate location data in a separate variable
            const locationData = {
                city: value.description,
                cordinates: {
                    lat: value.structured_formatting.main_text,
                    lng: value.structured_formatting.secondary_text
                }
            };
    
            // Set location data in formData
            formData.location = locationData;
    
            // Dispatch the formData to addNewCompany action
            dispatch(addNewCompany(formData));
        } else {
            // Handle the case where no location is selected
            console.error("No location selected!");
        }
    
        handleClose();
    };
    
    

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Company</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add New Comapny:
                </DialogContentText>

                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                        {...register("company_name")}
                            placeholder="Company Name"
                            {...field}
                        />
                    )}
                    name="company_name"
                /> 
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                        {...register("email")}
                            placeholder="Contact Email"
                            {...field}
                        />
                    )}
                    name="email"
                />
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField
                        {...register("description")}
                            placeholder="Description"
                            {...field}
                        />
                    )}
                    name="description"
                />
                        <Autocomplete                    
                        {...register("location.city")}
                        id="google-map-demo"
                        sx={{ width: 300 }}
                        getOptionLabel={(option) =>
                          typeof option === 'string' ? option : option.description
                        }
                        filterOptions={(x) => x}
                        options={options}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        value={value}
                        noOptionsText="No locations"
                        onChange={(event: any, newValue: PlaceType | null) => {
                          setOptions(newValue ? [newValue, ...options] : options);
                          setValue(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                          setInputValue(newInputValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Add a location" fullWidth />
                        )}
                        renderOption={(props, option) => {
                          const matches =
                            option.structured_formatting.main_text_matched_substrings || [];
                  
                          const parts = parse(
                            option.structured_formatting.main_text,
                            matches.map((match: any) => [match.offset, match.offset + match.length]),
                          );
                  
                          return (
                            <li {...props}>
                              <Grid container alignItems="center">
                                <Grid item sx={{ display: 'flex', width: 44 }}>
                                  <LocationOnIcon sx={{ color: 'text.secondary' }} />
                                </Grid>
                                <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                  {parts.map((part, index) => (
                                    <Box
                                      key={index}
                                      component="span"
                                      sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                      {part.text}
                                    </Box>
                                  ))}
                                  <Typography variant="body2" color="text.secondary">
                                    {option.structured_formatting.secondary_text}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </li>
                          );
                        }}
                      />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(handleSave)} >Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddCompany






























// import { addNewCompany } from '@/redux/company/companySlice';
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
// import React from 'react'
// import { Controller, useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';

// interface FormData {
//     company_id: string;
//     email: string,
//     company_name: string,
//     description: string,
//     location: {
//         city: string,
//         cordinates: {
//             lat: string,
//             lng: string
//         }
//   }
//     user: {
//         first_name: string,
//         role: string
//     }
// }


// const AddCompany = ({ open, handleClose }: { open: any, handleClose: any }) => {

//     const dispatch = useDispatch<any>();
//     const { register, control, handleSubmit, reset } = useForm<FormData>();

//     const handleSave = (formData: any) => {

//         // formData.append("location", data.cordinates.lat);

//         dispatch(addNewCompany(formData));
//         handleClose();
//     };

//     return (
//         <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Add Company</DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     Add New Comapny:
//                 </DialogContentText>

//                 <Controller
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                         <TextField
//                         {...register("company_name")}
//                             placeholder="Company Name"
//                             {...field}
//                         />
//                     )}
//                     name="company_name"
//                 /> 
//                 <Controller
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                         <TextField
//                         {...register("email")}
//                             placeholder="Contact Email"
//                             {...field}
//                         />
//                     )}
//                     name="email"
//                 />
//                 <Controller
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                         <TextField
//                         {...register("description")}
//                             placeholder="Description"
//                             {...field}
//                         />
//                     )}
//                     name="description"
//                 />
                
//                 <Controller
//                     control={control}
//                     rules={{ required: true }}
//                     render={({ field }) => (
//                         <TextField
//                         {...register("location.city")}
//                             placeholder="City"
//                             {...field}
//                         />
//                     )}
//                     name="location.city"

//                 />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button onClick={handleSubmit(handleSave)} >Save</Button>
//             </DialogActions>
//         </Dialog>
//     )
// }

// export default AddCompany
