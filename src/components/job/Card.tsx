import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { IconButton, Popover } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
} from 'next-share';

interface Data {
    _id: string;
    data: {
        company: {
            _id: string;
            company_name: string;
            location: {
                city: string;
            };
            cordinates: {
                lat: string;
                lng: string;
            };
        };
        job_title: string;
        job_type: string;
        createdAt: string;
        salary: number;
        description: string;
        category: string;
        requirements: string;
        status: string;
    };
}

export default function BasicCard({ data }: Data) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const shareUrl = `${process.env.BASE_URL}/job/view/`;
    const shareTitle = data.job_title;

    return (
        <Card sx={{ width: 445, cursor: 'pointer', background: '#FFF5FF'}}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Job Posting:
                </Typography>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
                    {data.job_title}
                </Typography>
                <Typography sx={{ mb: 1.5, textAlign: 'center' }} color="text.secondary">
                    {data.company.company_name}
                    {/* , {data.company.location.city} */}
                </Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {`Salary: ₹ ${data.salary}`}
                </Typography>
                <Typography variant="h5" component="div">
                    {/* {data.job_type} */}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    onClick={() => router.push(`/company/view/${data.company._id}`)}
                    sx={{ textAlign: 'center', ml: '36%' }}
                >
                    View Company
                </Button>
        
                <IconButton onClick={handleShareClick}>
                    <ShareIcon />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
                        <FacebookShareButton url={shareUrl} quote={shareTitle}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                        <div style={{ padding: '10px' }}>
                            <TwitterShareButton url={shareUrl} title={shareTitle}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </div>
                        <LinkedinShareButton url={shareUrl} title={shareTitle}>
                            <LinkedinIcon size={32} round />
                        </LinkedinShareButton>
                    </Box>
                </Popover>
            </CardActions>
        </Card>
    );
}









// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { useRouter } from 'next/navigation';
// import { IconButton, Popover } from '@mui/material';
// import ShareIcon from '@mui/icons-material/Share';
// // Hypothetical imports from react-this
// import {
//     FacebookShareButton,
//     TwitterShareButton,
//     LinkedinShareButton,
//     FacebookIcon,
//     TwitterIcon,
//     LinkedinIcon,
// } from 'react-this';

// interface Data {
//     _id: string
//     data: {
//         company: {
//             _id: string
//             company_name: string;
//             location: {
//                 city: string
//             }
//             cordinates: {
//                 lat: string
//                 lng: string
//             }
//         }
//         job_title: string;
//         job_type: string;
//         createdAt: string;
//         salary: number;
//         description: string;
//         category: string;
//         requirements: string;
//         status: string;
//     };
// }

// export default function BasicCard({ data }: Data) {
//     const router = useRouter();
//     console.log(data, "dataaaa");

//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     const open = Boolean(anchorEl);
//     const id = open ? 'simple-popover' : undefined;

//     const shareUrl = `${process.env.BASE_URL}/job/view/`;
//     const shareTitle = data.job_title;

//     return (
//         <Card sx={{ width: 445, cursor: "pointer", background: "#FFF5FF" }}>
//             <CardContent>
//                 <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//                     Job Posting:
//                 </Typography>
//                 <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
//                     {data.job_title}
//                 </Typography>
//                 <Typography sx={{ mb: 1.5, textAlign: "center" }} color="text.secondary">
//                     {data.company.company_name}, {data.company.location.city}
//                 </Typography>
//                 <Typography variant="body2" sx={{ textAlign: "center" }}>
//                     {`Salary: ₹ ${data.salary}`}
//                 </Typography>
//                 <Typography variant="h5" component="div">
//                     {/* {data.job_type} */}
//                 </Typography>
//             </CardContent>

//             <CardActions>
//                 <Button
//                     size="small"
//                     onClick={() => router.push(`/company/view/${data.company._id}`)}
//                     sx={{ textAlign: "center", ml: "36%" }}
//                 >
//                     View Company
//                 </Button>
//                 <IconButton onClick={handleShareClick}>
//                     <ShareIcon />
//                 </IconButton>
//                 <Popover
//                     id={id}
//                     open={open}
//                     anchorEl={anchorEl}
//                     onClose={handleClose}
//                     anchorOrigin={{
//                         vertical: 'bottom',
//                         horizontal: 'center',
//                     }}
//                     transformOrigin={{
//                         vertical: 'top',
//                         horizontal: 'center',
//                     }}
//                 >
//                     <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
//                         <FacebookShareButton url={shareUrl} quote={shareTitle}>
//                             <FacebookIcon size={32} round />
//                         </FacebookShareButton>
//                         <div style={{ padding: '10px' }}>
//                             <TwitterShareButton url={shareUrl} title={shareTitle}>
//                                 <TwitterIcon size={32} round />
//                             </TwitterShareButton>
//                         </div>
//                         <LinkedinShareButton url={shareUrl} title={shareTitle}>
//                             <LinkedinIcon size={32} round />
//                         </LinkedinShareButton>
//                     </Box>
//                 </Popover>
//             </CardActions>
//         </Card>
//     );
// }



// import React from 'react';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';

// interface Data {
//   _id: string;
//   data: {
//     company: {
//       company_id: string;
//       company_name: string;
//       location?: { // Make location optional
//         city?: string; // Make city optional
//         lat?: number; // Make lat optional
//         lng?: number; // Make lng optional
//       };
//     };
//     job_title: string;
//     job_type: string;
//     createdAt: string;
//     salary: number;
//     description: string;
//     category: string;
//     requirements: string;
//     status: string;
//   };
// }

// export default function BasicCard({ data }: Data) {
//   const router = useRouter();
//   console.log(data, "dataaaa");

//   return (
//     <Card sx={{ width: 445, cursor: "pointer", background: "#FFF5FF" }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           Job Posting
//         </Typography>
//         <Typography variant="h5" component="div">
//           {data.job_title}
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Company: {data.company.company_name}
//         </Typography>
//         {data.company.location && ( // Check if location is defined
//           <>
//             {data.company.location.city && ( // Check if city is defined
//               <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                 City: {data.company.location.city}
//               </Typography>
//             )}
//             {data.company.location.lat && data.company.location.lng && ( // Check if lat and lng are defined
//               <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                 Latitude: {data.company.location.lat}, Longitude: {data.company.location.lng}
//               </Typography>
//             )}
//           </>
//         )}
//         <Typography variant="body2">
//           {`Salary: ₹ ${data.salary}`}
//         </Typography>
//         <Typography variant="h5" component="div">
//           Job Type: {data.job_type}
//         </Typography>
//       </CardContent>

//       <CardActions>
//         <Button
//           size="small"
//           onClick={() => router.push(`/company/view/${data.company.company_id}`)}
//           sx={{ color: "" }}
//         >
//           View Company
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }
