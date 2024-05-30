
"use client"
import BasicCard from '@/components/job/Card';
import { fetchCompany } from '@/redux/company/companySlice';
import { fetchJobById } from '@/redux/job/jobSlice'
import { Box, Chip, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Values {
  company: {
    _id: string
    company_name: string;
    location: {
      city: string
    }
    cordinates: {
      lat: string
      lng: string
    }
  },
  job_title: string;
  job_type: string;
  posted_date: string;
  salary: number;
  createdAt: string
  description: string;
  category: string;
  requirements: string;
  status: string;
}

const page = ({ params }: { params: { id: string } }) => {
  const [formValue, setFormValue] = useState<Values>({
    job_title: "",
    job_type: "",
    posted_date: "",
    salary: 0,
    createdAt: '',
    category: '',
    description: '',
    requirements: '',
    status: '',
    company: {
      _id: "",
      company_name: '',
      location: {
        city: '',
      },
      cordinates: {
        lat: '',
        lng: ''
      }
    }
  })

  useEffect(() => {
    const fetchJob = async () => {
      const storedToken = localStorage.getItem("access_token")
      const response = await axios.post("http://localhost:5100/job/view", { _id: params.id },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }).then((res) => {
          const fetchData = res.data
          setFormValue(fetchData.data);
        })
    }
    fetchJob()
  }, [setFormValue])

  const jobTypeColor = formValue.job_type === 'part-time' ? 'blue' : 'green';
  const createdAtDate = new Date(formValue.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div>
      <Grid container spacing={2} sx={{
        paddingLeft: "23%",
      }}>
        <Grid  sx={{
          padding: "10% 10% 20px 10%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <BasicCard _id={params.id} data={formValue} />
        </Grid>
        <Grid >
          <Box sx={{ width: "700px" }}>

          <Grid container spacing={2}>
          <Grid xs={6}>
          <Box  sx={{ marginLeft: "60px" }}>
            <Typography variant='h6' sx={{ marginLeft: "60px", paddingTop:"20px" }}>
            Job Details
            </Typography>
            <Chip
                label={formValue.job_type}
                variant="outlined"
                sx={{ color: jobTypeColor, borderColor: jobTypeColor, width:"90px", height:"20px" , marginTop:"10px", textAlign:"center", marginLeft:"65px" }}
              />        
             <Typography sx={{ marginLeft: "60px", paddingTop:"10px" }}><span style={{ color: "gray"  }}>Posted Date:</span> {formattedDate} </Typography>
          </Box>
          </Grid>
          <Grid>
            <Box>
            <Typography variant='h6' sx={{ marginLeft: "60px", paddingTop:"20px" }}>
            Location
            </Typography>
            <Typography  sx={{ marginLeft: "60px", paddingTop:"10px" }}>
            {formValue.company.location.city}
            {/* {formValue.company.location.cordinates.lat}  */}
            </Typography>
            </Box>
          </Grid>
          </Grid>
          </Box>
          <Grid container spacing={2}> 
            <Grid xs={6}>
            <Box sx={{ marginTop: "15% " }}>
            <Typography> <span style={{ color: "gray" }}>Job Description: <br /> </span> {formValue.description} </Typography>
            <Typography>
            <span  style={{ color: "blue" }} > {formValue.category}</span>  
            </Typography>
            </Box>
          </Grid>
          <Grid xs={6} >\
          <Box sx={{ marginTop: "10% " }}>
            <Typography variant='h4'> Requirements</Typography>   
            <Chip label={formValue.requirements} sx={{ 
              padding: "20px",
              color:"green",
              margin: "40px",
              fontSize: "17px"
             }}/>
          </Box>
          </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default page




























// "use client"
// import React, { useEffect, useState } from 'react';
// import { Grid, Box, Typography, Chip } from '@mui/material';
// import BasicCard from '@/components/job/Card';
// import axios from 'axios';

// interface Values {
//   company: {
//     company_id: string;
//     company_name: string;
//     location: string;
//   };
//   job_title: string;
//   job_type: string;
//   posted_date: string;
//   salary: number;
//   createdAt: string;
//   description: string;
//   category: string;
//   requirements?: string[]; // Make requirements optional
//   status: string;
// }

// const Page = ({ params }: { params: { id: string } }) => {
//   const [formValue, setFormValue] = useState<Values>({
//     job_title: "",
//     job_type: "",
//     posted_date: "",
//     salary: 0,
//     createdAt: '',
//     category: '',
//     description: '',
//     status: '',
//     company: {
//       company_id: "",
//       company_name: '',
//       location: ""
//     }
//   });

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const storedToken = localStorage.getItem("access_token");
//         const response = await axios.post("http://localhost:5100/job/view", { _id: params.id }, {
//           headers: {
//             Authorization: `Bearer ${storedToken}`
//           }
//         });
//         const fetchData = response.data;
//         setFormValue(fetchData.data);
//       } catch (error) {
//         console.error('Error fetching job:', error);
//       }
//     };
//     fetchJob();
//   }, [params.id]);

//   const jobTypeColor = formValue.job_type === 'part-time' ? 'blue' : 'green';
//   const createdAtDate = new Date(formValue.createdAt);
//   const formattedDate = createdAtDate.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <BasicCard _id={params.id} data={formValue} />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Box sx={{ width: "700px" }}>
//             <Typography variant='h6'>
//               Job Details
//             </Typography>
//             <Chip
//               label={formValue.job_type}
//               variant="outlined"
//               sx={{ color: jobTypeColor, borderColor: jobTypeColor }}
//             />
//             <Typography>
//               <span style={{ color: "gray" }}>Posted Date:</span> {formattedDate}
//             </Typography>
//             <Typography variant='h6'>
//               Location
//             </Typography>
//           </Box>
//           <Box sx={{ margin: "20px 0" }}>
//             <Typography>
//               <span style={{ color: "gray" }}>Job Description:</span> {formValue.description}
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant='h6'>
//               Requirements
//             </Typography>
//             {formValue.requirements && formValue.requirements.map((requirement, index) => (
//               <Chip key={index} label={requirement} />
//             ))}            
//           </Box>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Page;
