import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeUser } from '@/redux/user/userSlice';

interface Data {
    _id: string,
    data: {
        _id: string
        company_name: string,
        email: string
        description: string
        location: {
            city: string,
            cordinates: {
                lat: number,
                lng: number
            }
        },
        user: {
            first_name: string,
            role: string
            
        }
    }
}

const CompanyViewCard = ({ data }: Data) => {
    const dispatch = useDispatch<any>();
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = () => {
        dispatch(subscribeUser());
        setIsSubscribed(true);
    };

    return (
        <div>
            <Box sx={{
                // border: "1px solid gray",
                background: "whitesmoke",
                borderRadius: "20px",
                width: "50%",
                minHeight: "40%",
                padding: "50px",
                margin: "9% 9%",
                marginLeft: "17%"
            }}>
                <Grid container spacing={2}>
                    <Grid sx={{ 
                        marginLeft: "30%"
                     }}>
                        <Card sx={{ padding: "20px", width: "300px" }}>
                            <CardContent>
                                <Typography>Company Name: {data.company_name}</Typography>
                                <Typography>Contact: {data.email}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid >
                        <Typography sx={{ color: "black", paddingLeft: "50px", paddingTop:"20px" }}>
                            <span style={{ color: "gray" }}>Description: <br /></span>
                            {data.description}
                        </Typography>
                        <CardActions>
                            <Button
                                sx={{
                                    background: isSubscribed ? "green" : "red",
                                    marginLeft: "50%",
                                    color: "white"
                                }}
                                onClick={handleSubscribe}
                                disabled={isSubscribed}
                            >
                                {isSubscribed ? "Subscribed" : "Subscribe"}
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default CompanyViewCard;







// import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
// import React, { useState } from 'react'
// import AddCompanyUser from './AddCompanyUser';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { useDispatch } from 'react-redux';
// import { deleteCompany } from '@/redux/company/companySlice';

// interface Data {
//     _id: string,
//     data: {
//         _id: string
//         company_name: string,
//         email: string
//         description: string
//         location: {
//             city: string,
//             cordinates: {
//                 lat: number,
//                 lng: number
//             }
//         },
//         user: {
//             first_name: string,
//             role: string
//         }
//     }
// }

// const CompanyViewCard = ({ data }: Data) => {

//     const dispatch = useDispatch<any>()


//     return (
//         <div style={{ }}>
//             <Box sx={{
//                 border: " 1px solid gray",
//                 background: "gray",
//                 borderRadius:"20px",
//                 width: "50%",
//                 minHeight: "40% ",
//                 padding: "50px",
//                 margin: "9% 9%",
//                 marginLeft: "17%"
//             }}>
//                 <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                         <Card
//                             sx={{ padding: "20px", width: "300px" }}
//                         >
//                             <CardContent>
//                                 <Typography > Company Name: {data.company_name} </Typography>
//                                 <Typography > Contact: {data.email} </Typography>
//                             </CardContent>

//                         </Card>
//                     </Grid>
//                     <Grid item xs={6}>
//                         <Typography sx={{ color: "black" , paddingLeft:"20px"}}> <span style={{ color: "whitesmoke"}}>  Description:  <br /></span> {data.description}  </Typography>
//                         <CardActions>

//                             <Button sx={{ background: "red", marginLeft:"50%" , color: "white" }}>
//                                 Subscribe
//                             </Button>
//                         </CardActions>
//                     </Grid>
//                 </Grid>
//             </Box>
//             {/* <AddCompanyUser open={addOpen} handleClose={handleAddClose} /> */}
//         </div>
//     )
// }
// export default CompanyViewCard