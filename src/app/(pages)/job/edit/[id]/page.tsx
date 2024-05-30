"use client"
import { editJob } from '@/redux/job/jobSlice';
import { Autocomplete, Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

interface Data {
    _id: string;
    company: {
        company_name: string;
        location: {
            city: string,
            coordinates: {
                lat: number,
                lng: number
            }
        };
    };
    job_title: string;
    job_type: string,
    posted_date: string;
    salary: number | string
    category: string
    description: string,
    requirements: string[]
    status: string
}

const defaultData: Data = {
    _id: "",
    company: {
        company_name: "",
        location: {
            city: "",
            coordinates: {
                lat: 0,
                lng: 0,
            },
        },
    },
    job_title: "",
    job_type: "",
    posted_date: "",
    salary: 0,
    category: "",
    description: '',
    requirements: [],
    status: ''
};
const EditJobDEtails = ({ params }: { params: { id: string } }) => {

    const router = useRouter()
    const [formValue, setFormValue] = useState({
        _id: "",
        company: {
            company_name: "",
            location: {
                city: "",
                coordinates: {
                    lat: 0,
                    lng: 0,
                },
            },
        },
        job_title: "",
        job_type: "",
        posted_date: "",
        salary: 0,
        category: "",
        description: '',
        requirements: [],
        status: ''
    })
    const dispatch = useDispatch<any>()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<Data>();


    useEffect(() => {
        const fetchJob = async () => {
            const storedToken = localStorage.getItem("access_token")
            const response = await axios.post("http://localhost:5100/job/view", { _id: params.id },
                //   const response = await axios.post(`${url.serverUrl}/job/view`, { _id: params.id },
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                }).then((res) => {
                    const fetchData = res.data
                    setFormValue(fetchData.data)
                    reset(fetchData.data);

                })
        }
        fetchJob()
    }, [reset, params.id])



    const onSubmit: SubmitHandler<Data> = async (data: any) => {
        dispatch(editJob(data));
        router.push('/dashboard/jobs')
    };



    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormValue({ ...formValue, [name]: newValue });
      };


    return (
        <Container component="main" maxWidth="xs" sx={{ marginBottom: "30px" }}>
            <div>
                <h3>Edit Job</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} style={{ padding: "30px 0px" }}>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="job_title"
                                // value={formValue.job_title}
                                {...register("job_title")}
                                onChange={handleInputChange}
                                name="job_title"
                                autoComplete="job_title"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="salary"
                                // value={formValue.salary}
                                {...register("salary")}
                                onChange={handleInputChange}
                                name="salary"
                                autoComplete="salary"
                            />
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={formValue.category}
                                    {...register("category")} onChange={handleInputChange}
                                >
                                    <MenuItem value={"developer"}>Developer</MenuItem>
                                    <MenuItem value={"backend-developer"}>Backend Development</MenuItem>
                                    <MenuItem value={"front-developer"}>Front Development</MenuItem>
                                    <MenuItem value={"ui/ux-developer"}>UI/UX Development</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                                <Select
                                    id="demo-simple-select"
                                    value={formValue.job_type}
                                    {...register("job_type")} onChange={handleInputChange}
                                >
                                    <MenuItem value={"part-time"}>Part Time</MenuItem>
                                    <MenuItem value={"full-time"}>Full Time</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={OurRequirements}
                                defaultValue={formValue.requirements}
                                getOptionLabel={(option) => option.title}
                                onChange={(event, value) => {
                                setFormValue({ ...formValue, requirements: value });
                                }}
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Requirements"
                                    placeholder="Favorites"
                                    value={formValue.requirements}
                                />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formValue.status}
                                    {...register("status")} onChange={handleInputChange}
                                >
                                    <MenuItem value={"Active"}>Active</MenuItem>
                                    <MenuItem value={"InActive"}>InActive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>                                  
                        <TextField
                                required
                                fullWidth
                                id="description"
                                // value={formValue.job_title}
                                {...register("description")}
                                onChange={handleInputChange}
                                name="description"
                                autoComplete="description"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </form>

            </div>
        </Container>
    )
}

export default EditJobDEtails



const OurRequirements: any = [
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
  ];







// "use client"
// import { editJob } from '@/redux/job/jobSlice';
// import { Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import axios from 'axios';
// import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';

// interface Data {
//     _id: string;
//     company: {
//         company_name: string;
//         location: {
//             city: string,
//             coordinates: {
//                 lat: number,
//                 lng: number
//             }
//         };
//     };
//     job_title: string;
//     job_type: string,
//     posted_date: string;
//     salary: number | string
//     category: string
//     description: string,
//     requirements: string
//     status: string
// }

// const defaultData: Data = {
//     _id: "",
//     company: {
//         company_name: "",
//         location: {
//             city: "",
//             coordinates: {
//                 lat: 0,
//                 lng: 0,
//             },
//         },
//     },
//     job_title: "",
//     job_type: "",
//     posted_date: "",
//     salary: 0,
//     category: "",
//     description: '',
//     requirements: '',
//     status: ''
// };
// const EditJobDEtails = ({ params }: { params: { id: string } }) => {

//     const router = useRouter()
//     const [formValue, setFormValue] = useState({
//         _id: "",
//         company: {
//             company_name: "",
//             location: {
//                 city: "",
//                 coordinates: {
//                     lat: 0,
//                     lng: 0,
//                 },
//             },
//         },
//         job_title: "",
//         job_type: "",
//         posted_date: "",
//         salary: 0,
//         category: "",
//         description: '',
//         requirements: '',
//         status: ''
//     })
//     const dispatch = useDispatch<any>()
//     const { register, handleSubmit, reset, formState: { errors } } = useForm<Data>();
//     const [html, setHtml] = useState(false)
//     const [javaScript, setJavaScript] = useState(false)
//     const [react, setReact] = useState(false)
//     const [figma, setfigma] = useState(false)
//     const [photoShop, setPhotoShop] = useState(false)
//     const [node, setNode] = useState(false)
//     const [typeScript, setTypeScript] = useState(false)
//     const [nextJS, setNextJS] = useState(false)
//     const [css, setCss] = useState(false)


//     useEffect(() => {
//         const fetchJob = async () => {
//             const storedToken = localStorage.getItem("access_token")
//             const response = await axios.post("http://localhost:5100/job/view", { _id: params.id },
//                 //   const response = await axios.post(`${url.serverUrl}/job/view`, { _id: params.id },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${storedToken}`
//                     }
//                 }).then((res) => {
//                     const fetchData = res.data
//                     setFormValue(fetchData.data)
//                     reset(fetchData.data);

//                 })
//         }
//         fetchJob()
//     }, [reset, params.id])



//     const onSubmit: SubmitHandler<Data> = async (data: any) => {
//         dispatch(editJob(data));
//         router.push('/dashboard/jobs')
//     };


//     useEffect(() => {
//         if (formValue.requirements.toLowerCase().includes("html")) {
//             setHtml(true)
//         }
//         if (formValue.requirements.toLowerCase().includes("javaScript")) {
//             setJavaScript(true)
//         }
//         if (formValue.requirements.toLowerCase().includes("react")) {
//             setReact(true)
//         }
//         if (formValue.requirements.toLowerCase().includes("figma")) {
//             setfigma(true)
//         }
//         if (formValue.requirements.toLowerCase().includes("photoShop")) {
//             setPhotoShop(true)
//         }
//         if (formValue.requirements.toLowerCase().includes("node")) {
//             setNode(true)
//         }
//         if (formValue.requirements.toLowerCase().includes("typeScript")) {
//             setTypeScript(true)
//         }
//         if (formValue.requirements.toLowerCase().includes("nextJS")) {
//             setNextJS(true)
//         }
//         if (formValue.requirements.toLowerCase().includes("css")) {
//             setCss(true)
//         }
//     }, [formValue])



//     const handleInputChange = (e: any) => {
//         setFormValue({ ...formValue, [e.target.name]: e.target.value })
//     }

//     const handleChange1 = () => {
//         html ? setHtml(false) : setHtml(true)
//     }
//     const handleChange2 = () => {
//         javaScript ? setJavaScript(false) : setJavaScript(true)
//     }
//     const handleChange3 = () => {
//         react ? setReact(false) : setReact(true)
//     }
//     const handleChange4 = () => {
//         figma ? setfigma(false) : setfigma(true)
//     }
//     const handleChange5 = () => {
//         photoShop ? setPhotoShop(false) : setPhotoShop(true)
//     }
//     const handleChange6 = () => {
//         node ? setNode(false) : setNode(true)
//     }
//     const handleChange7 = () => {
//         typeScript ? setTypeScript(false) : setTypeScript(true)
//     }
//     const handleChange8 = () => {
//         nextJS ? setNextJS(false) : setNextJS(true)
//     }
//     const handleChange9 = () => {
//         css ? setCss(false) : setCss(true)
//     }

//     return (
//         <Container component="main" maxWidth="xs" sx={{ marginBottom: "30px" }}>
//             <div>
//                 <h3>Edit Job</h3>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Grid container spacing={2} style={{ padding: "30px 0px" }}>

//                         <Grid item xs={12}>
//                             <TextField
//                                 required
//                                 fullWidth
//                                 id="job_title"
//                                 // value={formValue.job_title}
//                                 {...register("job_title")}
//                                 onChange={handleInputChange}
//                                 name="job_title"
//                                 autoComplete="job_title"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 required
//                                 fullWidth
//                                 id="salary"
//                                 // value={formValue.salary}
//                                 {...register("salary")}
//                                 onChange={handleInputChange}
//                                 name="salary"
//                                 autoComplete="salary"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Category</InputLabel>
//                                 <Select
//                                     id="demo-simple-select"
//                                     value={formValue.category}
//                                     {...register("category")} onChange={handleInputChange}
//                                 >
//                                     <MenuItem value={"developer"}>Developer</MenuItem>
//                                     <MenuItem value={"backend-developer"}>Backend Development</MenuItem>
//                                     <MenuItem value={"front-developer"}>Front Development</MenuItem>
//                                     <MenuItem value={"ui/ux-developer"}>UI/UX Development</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
//                                 <Select
//                                     id="demo-simple-select"
//                                     value={formValue.job_type}
//                                     {...register("job_type")} onChange={handleInputChange}
//                                 >
//                                     <MenuItem value={"part-time"}>Part Time</MenuItem>
//                                     <MenuItem value={"full-time"}>Full Time</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid item xs={10}>
//                         <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
//                             <FormControlLabel
//                                 id='requirements'
//                                 control={<Checkbox  {...register("requirements")} onChange={handleChange1} checked={html} />}
//                                 value="Html" label="Html" />

//                             <FormControlLabel id='requirements'
//                                 control={<Checkbox  {...register("requirements")} onChange={handleChange2} checked={javaScript} />}
//                                 value="JavaScript" label="JavaScript" />

//                             <FormControlLabel id='requirements'
//                                 control={<Checkbox {...register("requirements")} onChange={handleChange3} checked={react} />}
//                                 value="React" label="React" />
//                             <FormControlLabel
//                                 id='requirements'
//                                 control={<Checkbox  {...register("requirements")} onChange={handleChange4} checked={figma} />}
//                                 value="Figma" label="Figma" />
//                             <FormControlLabel
//                                 id='requirements'
//                                 control={<Checkbox  {...register("requirements")} onChange={handleChange5} checked={photoShop} />}
//                                 value="PhotoShop" label="PhotoShop" />
//                             <FormControlLabel
//                                 id='requirements'
//                                 control={<Checkbox  {...register("requirements")} onChange={handleChange6} checked={node} />}
//                                 value="NodeJs" label="NodeJs" />
//                             <FormControlLabel
//                                 id='requirements'
//                                 control={<Checkbox  {...register("requirements")} onChange={handleChange7} checked={typeScript} />}
//                                 value="TypeScript" label="TypeScript" />
//                             <FormControlLabel
//                                 id='requirements'
//                                 control={<Checkbox  {...register("requirements")} onChange={handleChange8} checked={nextJS} />}
//                                 value="NextJS" label="NextJS" />
//                             <FormControlLabel
//                                 id='requirements'
//                                 control={<Checkbox  {...register("requirements")} onChange={handleChange9} checked={css} />}
//                                 value="CSS" label="CSS" />
//                         </FormGroup>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Status</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={formValue.status}
//                                     {...register("status")} onChange={handleInputChange}
//                                 >
//                                     <MenuItem value={"Active"}>Active</MenuItem>
//                                     <MenuItem value={"InActive"}>InActive</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
              
//                         <TextField
//                                 required
//                                 fullWidth
//                                 id="description"
//                                 // value={formValue.job_title}
//                                 {...register("description")}
//                                 onChange={handleInputChange}
//                                 name="description"
//                                 autoComplete="description"
//                             />
//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                     >
//                         Submit
//                     </Button>
//                 </form>

//             </div>
//         </Container>
//     )
// }

// export default EditJobDEtails
