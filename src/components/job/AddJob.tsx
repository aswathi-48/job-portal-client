


"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, TextareaAutosize } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { addNewJobs } from '@/redux/job/jobSlice';
import Textarea from '@mui/joy/Textarea';

interface FormData {
  company: {
    _id: string
    company_name: string;
    location: string;
  };

  job_title: string;
  job_type: string,
  salary: number | string
  category: string
  description: string,
  requirements: string[]
  status: string
  createdAt: string
}


// interface Company {
//   company_id: string,
//   company_name: string
// }

// interface AddJobProps {
//   open: Boolean;
//   handleClose: () => void;
//   companies: Company[]
// }



export default function AddNewJob({ open, handleClose, companies }: { open: any, handleClose: any, companies: any }) {

  const { register, control, handleSubmit, reset, setValue, getValues } = useForm<FormData>();
  const jobs = useSelector((state: any) => state.job.job)
  console.log(companies, "companieee");


  const dispatch = useDispatch<any>();

  const handleSave = (formData: any) => {
    // Convert array of requirements to a string
    // formData.requirements = formData.requirements.join(', ');
    dispatch(addNewJobs(formData));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Add New Jobs:
        </DialogContentText>

        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Comapny</InputLabel>

          <Controller
            name="company._id"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                labelId="company-select-label"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  const selectedCompany = companies.find((company: any) => company._id === value);
                  if (selectedCompany) {
                    setValue('company.company_name', selectedCompany.company_name);
                    setValue('company.location', selectedCompany.location);
                  }
                }}
              >
                {companies.map((company: any) => (
                  <MenuItem key={company._id} value={company._id}>
                    {company.company_name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          label="Job Title"
          type="text"
          fullWidth
          {...register("job_title")}
          name='job_title'
        />
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("job_type")}
            name='job_type'
          >
            <MenuItem value={"part-time"}>Part Time</MenuItem>
            <MenuItem value={"full-time"}>Full Time</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          label="Salary"
          type="number"
          fullWidth
          {...register("salary")}
          name='salary'
        />
        <Stack spacing={3} sx={{ width: 500 }}>
          <Autocomplete
            multiple
            id="tags-standard"
            options={OurRequirements}
            getOptionLabel={(option) => option.title}
            defaultValue={[OurRequirements[0]]}
            onChange={(event, value) => {
              setValue("requirements", value.map((option) => option.title));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Requirements"
                placeholder="Favorites"
              />
            )}
          />

        </Stack>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("category")}
            name='category'
          >
            <MenuItem value={"developer"}>Developer</MenuItem>
            <MenuItem value={"backend-developer"}>Backend Development</MenuItem>
            <MenuItem value={"front-developer"}>Front Development</MenuItem>
            <MenuItem value={"ui/ux-developer"}>UI/UX Development</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          {...register("description")}
          name='description'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit(handleSave)} >Save</Button>
      </DialogActions>
    </Dialog>
  );
}


const OurRequirements = [
  { title: 'HTML' },
  { title: 'CSS' },
  { title: 'JavaScript' },
  { title: 'ReactJs' },
  { title: 'NextJs' },
  { title: 'Python' },
  { title: 'NodeJs' },
  { title: 'Photoshop' },
  { title: 'Figma' },
  { title: 'TypeScript' },
]



// "use client"
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, TextareaAutosize } from '@mui/material';
// import { Controller, useForm } from 'react-hook-form';
// import { addNewJobs } from '@/redux/job/jobSlice';
// import Textarea from '@mui/joy/Textarea';

// interface FormData {
//   company: {
//     _id: string
//     company_name: string;
//     location: string;
//   };

//   job_title: string;
//   job_type: string,
//   salary: number | string
//   category: string
//   description: string,
//   requirements: string[]
//   status: string
//   createdAt: string
// }


// // interface Company {
// //   company_id: string,
// //   company_name: string
// // }

// // interface AddJobProps {
// //   open: Boolean;
// //   handleClose: () => void;
// //   companies: Company[]
// // }



// export default function AddNewJob({ open, handleClose, companies }: { open: any, handleClose: any, companies: any }) {

//   const { register, control, handleSubmit, reset, setValue, getValues } = useForm<FormData>();
//   const jobs = useSelector((state: any) => state.job.job)
// console.log(companies,"companieee");


//   const dispatch = useDispatch<any>();

//   const handleSave = (formData: any) => {
//     // Convert array of requirements to a string
//     formData.requirements = formData.requirements.join(', ');
//     dispatch(addNewJobs(formData));
//     handleClose();
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Add Employee</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Add New Jobs:
//         </DialogContentText>

//         <FormControl fullWidth >
//           <InputLabel id="demo-simple-select-label">Comapny</InputLabel>

//           <Controller
//             name="company._id"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 labelId="company-select-label"
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   field.onChange(value);
//                   const selectedCompany = companies.find((company: any) => company._id === value);
//                   if (selectedCompany) {
//                     setValue('company.company_name', selectedCompany.company_name);
//                     setValue('company.location', selectedCompany.location);
//                   }
//                 }}
//               >
//                 {companies.map((company: any) => (
//                   <MenuItem key={company._id} value={company._id}>
//                     {company.company_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             )}
//           />
//         </FormControl>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Job Title"
//           type="text"
//           fullWidth
//           {...register("job_title")}
//           name='job_title'
//         />
//         <FormControl fullWidth >
//           <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             {...register("job_type")}
//             name='job_type'
//           >
//             <MenuItem value={"part-time"}>Part Time</MenuItem>
//             <MenuItem value={"full-time"}>Full Time</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Salary"
//           type="number"
//           fullWidth
//           {...register("salary")}
//           name='salary'
//         />
//         <FormGroup>
//           <FormLabel>Requirements</FormLabel>
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="HTML" />}
//             label="HTML"
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="JavaScript" />}
//             label="JavaScript"
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="ReactJS" />}
//             label="ReactJS"
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="Figma" />}
//             label="Figma"
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="PhotoShop" />}
//             label="PhotoShop"
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="NodeJs" />}
//             label="NodeJs"
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="TypeScript" />}
//             label="TypeScript"
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="NextJS" />}
//             label="NextJS"
//           />
//           <FormControlLabel
//             control={<Checkbox {...register("requirements")} value="CSS" />}
//             label="CSS"
//           />
//         </FormGroup>
//         <FormControl fullWidth >
//           <InputLabel id="demo-simple-select-label">Category</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             {...register("category")}
//             name='category'
//           >
//             <MenuItem value={"developer"}>Developer</MenuItem>
//             <MenuItem value={"backend-developer"}>Backend Development</MenuItem>
//             <MenuItem value={"front-developer"}>Front Development</MenuItem>
//             <MenuItem value={"ui/ux-developer"}>UI/UX Development</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Description"
//           type="text"
//           fullWidth
//           {...register("description")}
//           name='description'
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Cancel</Button>
//         <Button onClick={handleSubmit(handleSave)} >Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
