
// import React, { useState } from 'react';
// import Box from '@mui/joy/Box';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import ShareIcon from '@mui/icons-material/Share';
// import { Card, Chip, Button, Popover, IconButton, Grid } from '@mui/material';
// import Link from 'next/link';
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   LinkedinShareButton,
//   FacebookIcon,
//   TwitterIcon,
//   LinkedinIcon,
// } from 'react-share';
// interface Company {
//   company_name: string;
//   location: {
//     city: string;
//     coordinates: {
//       lat: number;
//       lng: number;
//     };
//   };
// }
// interface JobData {
//   _id: string;
//   company?: Company;
//   job_title: string;
//   job_type: string;
//   posted_date: string;
//   salary: number;
//   category: string;
//   createdAt: string;
//   description: string;
//   requirements: string[];
//   status: string;
// }
// interface CardVariantsProps {
//   data: JobData;
// }
// export default function CardVariants({ data }: CardVariantsProps) {

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };


  
  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;
//   const createdAtDate = new Date(data.createdAt);
//   const formattedDate = createdAtDate.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
//   const jobTypeColor = data.job_type === 'part-time' ? 'blue' : 'green';
  // const shareUrl = `${process.env.BASE_URL}/job/view/${data._id}`;
  // const shareTitle = data.job_title;
//   return (
//     <div>
//       <Box
//         sx={{
//           width: '100%',
//           display: 'grid',
//           padding: '10px',
//           height: '230px',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
//           cursor: 'pointer',
//         }}
//       >
//         <Card sx={{ padding: '20px', background: "#f1f1f1" }}>
//           <CardContent sx={{ paddingTop: '10px' }}>
//             <Chip label={formattedDate} variant="outlined" sx={{ width: '130px', marginLeft: '45px' }} />
//             <Typography level="title-md" textColor="inherit" sx={{ paddingTop: '20px' }}>
//               {data.job_title}
//             </Typography>
//             {data.company && (
//               <>
//                 <Typography textColor="inherit" sx={{ textAlign: "center" }}>
//                   {data.company.company_name}, {data.company.location.city}
//                 </Typography>
//               </>
//             )}
//             <Chip
//               label={data.job_type}
//               variant="outlined"
//               sx={{ color: jobTypeColor, borderColor: jobTypeColor, width: "90px", height: "20px", marginTop: "20px", textAlign: "center", marginLeft: "65px" }}
//             />
//             <Grid container spacing={2} sx={{
//               marginLeft: "15px"
//             }}>
//               <Grid xs={9} >
//                 <Link href={{ pathname: `/job/view/${data._id}` }} style={{ textDecoration: 'none' }}>
//                   <Button sx={{
//                     marginLeft: "80px",
//                     paddingTop: "35px",
//                     color: "gray",
//                     fontSize: "15px"
//                   }}>Know more
//                   </Button>
//                 </Link>

//               </Grid>
//               <Grid xs={2}>
                // <IconButton
                //   onClick={handleShareClick}
                //   sx={{ marginTop: '28px' }}
                // >
                //   <ShareIcon />
                // </IconButton>

//               </Grid>
//             </Grid>
            // <Popover
            //   id={id}
            //   open={open}
            //   anchorEl={anchorEl}
            //   onClose={handleClose}
            //   anchorOrigin={{
            //     vertical: 'bottom',
            //     horizontal: 'center',
            //   }}
            //   transformOrigin={{
            //     vertical: 'top',
            //     horizontal: 'center',
            //   }}
            // >
            //   <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
            //     <FacebookShareButton url={shareUrl} quote={shareTitle}>
            //       <FacebookIcon size={32} round />
            //     </FacebookShareButton>
            //     <TwitterShareButton url={shareUrl} title={shareTitle}>
            //       <TwitterIcon size={32} round />
            //     </TwitterShareButton>
            //     <LinkedinShareButton url={shareUrl} title={shareTitle}>
            //       <LinkedinIcon size={32} round />
            //     </LinkedinShareButton>
            //   </Box>
            // </Popover>
//           </CardContent>
//         </Card>
//       </Box>
//     </div>
//   );
// }


// import React from 'react';
// import Box from '@mui/joy/Box';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import { Card, Chip } from '@mui/material';
// import Link from 'next/link';
// interface Company {
//   company_name: string;
//   location: {
//     city: string;
//     coordinates: {
//       lat: number;
//       lng: number;
//     };
//   };
// }
// interface JobData {
//   _id: string;
//   company?: Company;
//   job_title: string;
//   job_type: string;
//   posted_date: string;
//   salary: number;
//   category: string;
//   createdAt: string;
//   description: string;
//   requirements: string[];
//   status: string; // 'active' or 'inactive'
// }
// interface CardVariantsProps {
//   data: JobData;
// }
// export default function CardVariants({ data }: CardVariantsProps) {
//   // If job is inactive, return null or a message indicating it's inactive
//   if (data.status === 'InActive') {
//     return null; // or return a message, e.g., <div>Job is inactive</div>
//   }
//   const createdAtDate = new Date(data.createdAt);
//   const formattedDate = createdAtDate.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
//   const jobTypeColor = data.job_type === 'part-time' ? 'blue' : 'green';
//   const jobStatus = data.status === 'InActive' ? 'red' : 'green';

//   return (
//     <div>
//       <Link href={{ pathname: `/job/view/${data._id}` }} style={{ textDecoration: 'none' }}>
//         <Box
//           sx={{
//             width: '100%',
//             display: 'grid',
//             padding: '10px',
//             height: '200px',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
//             cursor: 'pointer',
//           }}
//         >
//           <Card sx={{ padding: '20px', background: "#f1f1f1" }}>
//             <CardContent sx={{ paddingTop: '10px' }}>
//               <Chip label={formattedDate} variant="outlined" sx={{ width: '130px', marginLeft: '45px' }} />
//               <Typography level="title-md" textColor="inherit" sx={{ paddingTop: '20px' }}>
//                 {data.job_title}
//               </Typography>
//               {data.company && (
//                 <>
//                   <Typography textColor="inherit" sx={{ textAlign: "center" }}>
//                     {data.company.company_name}, {data.company.location.city}
//                   </Typography>
//                 </>
//               )}
//               <Chip
//                 label={data.status}
//                 variant="outlined"
//                 sx={{ color: jobStatus, borderColor: jobStatus, width: "90px", height: "20px", marginTop: "20px", textAlign: "center", marginLeft: "65px" }}
//               />
//             </CardContent>
//           </Card>
//         </Box>
//       </Link>
//     </div>
//   );
// }







import React from 'react';
import Box from '@mui/joy/Box';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Card, Chip } from '@mui/material';
import Link from 'next/link';

interface Company {
  company_name: string;
  location: {
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

interface JobData {
  _id: string;
  company?: Company;
  job_title: string;
  job_type: string;
  posted_date: string;
  salary: number;
  category: string;
  createdAt: string;
  description: string;
  requirements: string[];
  status: string;
}

interface CardVariantsProps {
  data: JobData;
}

export default function CardVariants({ data }: CardVariantsProps) {

  const createdAtDate = new Date(data.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const jobStatusColor = data.status === 'InActive' ? 'red' : 'green';

  return (
    <div>
      <Link href={{ pathname: `/job/view/${data._id}` }} style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            width: '100%',
            // maxWidth: 990,
            display: 'grid',
            padding: '10px',
            height: '200px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            // gap: 2,
            cursor: 'pointer',
          }}
        >

          <Card sx={{ padding: '20px',  background:"#f1f1f1", }}>
            <CardContent sx={{ paddingTop: '10px' }}>
              <Chip label={formattedDate} variant="outlined" sx={{ width: '130px', marginLeft: '45px' }} />
              <Typography level="title-md" textColor="inherit" sx={{ paddingTop: '20px' }}>
                {data.job_title}
              </Typography>

              {data.company && (
                <>
                  <Typography textColor="inherit" sx={{ textAlign:"center" }}>
                    {data.company.company_name}, {data.company.location.city}
                  </Typography>
                  <Typography textColor="inherit" sx={{ }}>

                  </Typography>
                </>
              )}
               {/* <Typography textColor="inherit" sx={{ }}>
                {data.category}
              </Typography> */}
              <Chip
                label={data.status}
                variant="outlined"
                sx={{ color: jobStatusColor, borderColor: jobStatusColor, width:"90px", height:"20px" , marginTop:"20px", textAlign:"center", marginLeft:"65px" }}
              />

            </CardContent>
          </Card>
        </Box>
      </Link>
    </div>
  );
}
