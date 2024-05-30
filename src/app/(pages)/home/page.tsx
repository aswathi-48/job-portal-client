"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '@/redux/job/jobSlice';
import CardVariants from '@/components/job/BasicCard';
import {
  Box, Grid, Paper, InputBase, IconButton, FormControl, InputLabel, Select, MenuItem, Card, CardContent, Typography, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import img from '../../../../public/image/job.jpg';
import img2 from '../../../../public/image/img.jpg';

const Page = () => {
  const jobs = useSelector((state: any) => state.job.jobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6; // Number of jobs to display per page

  const dispatch = useDispatch<any>();
  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };

  useEffect(() => {
    dispatch(fetchJobs({ q: searchTerm, job_type: typeFilter, category: categoryFilter }));
  }, [dispatch, searchTerm, typeFilter, categoryFilter]);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '300px',
            backgroundImage: `url(${img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper component="form" sx={{ ml: "10px", mt: "20px", p: '4px 4px', display: 'flex', alignItems: 'center', width: 450, color: "white" }} >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs..."
              fullWidth
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card
              sx={{
                height: "230px",
                width: "200px",
                mt: "10px",
                backgroundImage: `url(${img2.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <CardContent>
                <Typography sx={{
                  color: "white",
                  padding: "20px",
                  fontFamily: "monospace",
                  fontSize: "20px"
                }}>
                  Get Your Best Profession With LuckyJob
                </Typography>
              </CardContent>
            </Card>
            <Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ width: "200px", mt: "48px" }}>
                  <InputLabel id="job-type-label">Job Type</InputLabel>
                  <Select
                    labelId="job-type-label"
                    id="job-type-select"
                    value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <MenuItem value="">All Type</MenuItem>
                    <MenuItem value="full-time">Full Time</MenuItem>
                    <MenuItem value="part-time">Part Time</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ width: "200px", mt: "48px" }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="developer">Development</MenuItem>
                    <MenuItem value="backend-developer">Backend Development</MenuItem>
                    <MenuItem value="front-developer">Front Development</MenuItem>
                    <MenuItem value="ui/ux-developer">UI/UX Development</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Box>
              <Typography variant='h4' sx={{ mt: "10px" }}>
                Recommended Jobs
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                {currentJobs.map((job: any, index: any) => (
                  <Box key={index}>
                    <CardVariants data={job} />
                  </Box>
                ))}
              </Box>
              <Pagination
                count={Math.ceil(jobs.length / jobsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Page;

// "use client";
// import CardVariants from '@/components/job/BasicCard';
// import { fetchJobs } from '@/redux/job/jobSlice';
// import { Grid, Box, Paper, InputBase, IconButton, Button } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import img from '../../../../public/image/job.jpg';
// import AddNewJob from '@/components/job/AddJob';
// import JobDetailsDialog from '@/components/job/JobDetailsDialog';

// const Page = () => {
//   const jobs = useSelector((state: any) => state.job.jobs);
//   const [searchTerm, setSearchTerm] = useState('');
//   const dispatch = useDispatch<any>();
//   const [addOpen, setAddOpen] = useState(false);
//   const [jobDialogOpen, setJobDialogOpen] = useState(false);
//   const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
//   const handleAddOpen = () => {
//     setAddOpen(true);
//   };
//   const handleAddClose = () => {
//     setAddOpen(false);
//   };
//   const handleJobClick = (jobId: string) => {
//     setSelectedJobId(jobId);
//     setJobDialogOpen(true);
//   };
//   const handleJobDialogClose = () => {
//     setJobDialogOpen(false);
//     setSelectedJobId(null);
//   };
//   useEffect(() => {
//     dispatch(fetchJobs({ q: searchTerm }));
//   }, [dispatch, searchTerm]);
//   return (
//     <div>
//       <Box sx={{ padding: "20px" }}>
//         <Box sx={{ display: "flex", justifyContent: "space-around", marginLeft: "79%", border: "1px solid #000435", width: "140px" }}>
//           <Button onClick={handleAddOpen}>Add New Job</Button>
//         </Box>
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <Box
//               sx={{
//                 position: 'relative',
//                 width: '100%',
//                 height: '500px',
//                 backgroundImage: `url(${img.src})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: "30px",
//                 justifyContent: 'center',
//               }}
//             >
//               <Paper component="form" sx={{ ml: "10px", mt: "20px", p: '4px 4px', display: 'flex', alignItems: 'center', width: 450, color: "white" }}>
//                 <InputBase
//                   sx={{ ml: 1, flex: 1 }}
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search jobs..."
//                   fullWidth
//                 />
//                 <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//                   <SearchIcon />
//                 </IconButton>
//               </Paper>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{ padding: "20px 60px" }}>
//               {jobs.map((job: any, index: any) => (
//                 <Box key={index} flexGrow={1} minWidth="30%" margin="10px" sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
//                   <CardVariants data={job} onClick={() => handleJobClick(job.id)} />
//                 </Box>
//               ))}
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//       <AddNewJob open={addOpen} handleClose={handleAddClose} />
//       {selectedJobId && (
//         <JobDetailsDialog
//           open={jobDialogOpen}
//           onClose={handleJobDialogClose}
//           jobId={selectedJobId}
//         />
//       )}
//     </div>
//   );
// };
// export default Page;










