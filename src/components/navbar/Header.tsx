"use client"
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ProfileView from '../admin/ProfileView';
import UploadCv from './UploadCv';

function ResponsiveAppBar() {
  const router = useRouter();
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false); 
  const [addOpen, setAddOpen] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleProfileClick = (event:any) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null);
  };

  useEffect(() => {
    // Fetch the user's image from localStorage when the component mounts
    const image = localStorage.getItem('image');
    const role = localStorage.getItem('role')

    if (image) {
      setUserImage(image);
    }

    if(role) {
      setUserRole(role)
    }
  }, []);


  const userId = localStorage.getItem('userId') || '';
  console.log(userId);
  

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('adminId');
    localStorage.removeItem('first_name');
    localStorage.removeItem('gender');
    router.push('/login');
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };
  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleOpenLogoutDialog = () => {
    setLogoutDialogOpen(true);
    handleCloseProfileMenu();
  };

  const handleCloseLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const handleOpenProfileDialog = () => { 
    setProfileDialogOpen(true);
    handleCloseProfileMenu();
  };

  const handleCloseProfileDialog = () => { 
    setProfileDialogOpen(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ background: "#1c2a38" }}>
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <div>
            
          {userRole === 'client' && (
              <Button onClick={handleAddOpen}>Upload Cv</Button>
            )}
          <Button onClick={handleProfileClick} sx={{ color: 'inherit' }}>
            {userImage ? (
              <Avatar alt="User Avatar" src={userImage} />
            ) : (
              <AccountCircle />
            )}
          </Button>
          </div>
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleCloseProfileMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleOpenProfileDialog}>Profile</MenuItem>
            <MenuItem onClick={handleOpenLogoutDialog}>Logout</MenuItem>
                
          {userRole === 'admin'  && (
            <MenuItem onClick={() => router.push('/dashboard')}>Dashboard</MenuItem>           
          )}
          </Menu>

        </Toolbar>
      </Container>
      <Dialog open={logoutDialogOpen} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>

        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </DialogActions>

      </Dialog>
      <Dialog open={profileDialogOpen} onClose={handleCloseProfileDialog}>

        <DialogContent>
            <ProfileView params={{ id: userId }}/>         
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseProfileDialog}>Close</Button>
        </DialogActions>

      </Dialog>
      <UploadCv open={addOpen} handleClose={handleAddClose} userId={userId}/>
    </AppBar>
  );
}

export default ResponsiveAppBar;



// edit code add

// "use client"
// import React, { useEffect, useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Avatar, TextField } from '@mui/material';
// import { AccountCircle } from '@mui/icons-material';
// import { useRouter } from 'next/navigation';
// import ProfileView from '../admin/ProfileView';
// import UploadCv from './UploadCv';
// import { useDispatch, useSelector } from 'react-redux';
// // import { fetchSkills, editSkill } from '../redux/slices/skillSlice';
// import { RootState } from '@/redux/store';
// import { editSkill, fetchSkills } from '@/redux/skill/skillSlice';
// // import { RootState } from '../redux/store';

// function ResponsiveAppBar() {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const skillsData = useSelector((state: RootState) => state.skill.skills);

//   const [profileAnchorEl, setProfileAnchorEl] = useState(null);
//   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
//   const [profileDialogOpen, setProfileDialogOpen] = useState(false); 
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [userImage, setUserImage] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [userSkills, setUserSkills] = useState<string[]>([]);

//   const handleProfileClick = (event: any) => {
//     setProfileAnchorEl(event.currentTarget);
//   };

//   const handleCloseProfileMenu = () => {
//     setProfileAnchorEl(null);
//   };

//   useEffect(() => {
//     // Fetch the user's image and role from localStorage when the component mounts
//     const image = localStorage.getItem('image');
//     const role = localStorage.getItem('role');
//     const userId = localStorage.getItem('userId') || '';

//     if (image) {
//       setUserImage(image);
//     }

//     if (role) {
//       setUserRole(role);
//     }

//     if (userId) {
//       // Fetch the user's skills
//       dispatch(fetchSkills({ q: userId }));
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (skillsData.length > 0) {
//       const userSkillsData = skillsData.find(skill => skill.user.userId === localStorage.getItem('userId'));
//       if (userSkillsData) {
//         setUserSkills(userSkillsData.skills.split(", "));  // Assume skills are stored as a comma-separated string
//       }
//     }
//   }, [skillsData]);

//   const userId = localStorage.getItem('userId') || '';
//   console.log(userId);

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('adminId');
//     localStorage.removeItem('first_name');
//     localStorage.removeItem('gender');
//     router.push('/login');
//   };

//   const handleEditOpen = () => {
//     setEditDialogOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditDialogOpen(false);
//   };

//   const handleOpenLogoutDialog = () => {
//     setLogoutDialogOpen(true);
//     handleCloseProfileMenu();
//   };

//   const handleCloseLogoutDialog = () => {
//     setLogoutDialogOpen(false);
//   };

//   const handleOpenProfileDialog = () => { 
//     setProfileDialogOpen(true);
//     handleCloseProfileMenu();
//   };

//   const handleCloseProfileDialog = () => { 
//     setProfileDialogOpen(false);
//   };

//   const handleSaveSkills = () => {
//     const updatedSkills = userSkills.join(", ");
//     dispatch(editSkill({ _id: userId, skills: updatedSkills }));
//     handleEditClose();
//   };

//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl" sx={{ background: "#1c2a38" }}>
//         <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
          
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             LOGO
//           </Typography>
//           <div>
//             {userRole === 'client' && (
//               userSkills.length === 0 ? (
//                 <Button onClick={() => setEditDialogOpen(true)}>Upload Cv</Button>
//               ) : (
//                 <Button onClick={handleEditOpen}>Edit Skills</Button>
//               )
//             )}
//             <Button onClick={handleProfileClick} sx={{ color: 'inherit' }}>
//               {userImage ? (
//                 <Avatar alt="User Avatar" src={userImage} />
//               ) : (
//                 <AccountCircle />
//               )}
//             </Button>
//           </div>
//           <Menu
//             anchorEl={profileAnchorEl}
//             open={Boolean(profileAnchorEl)}
//             onClose={handleCloseProfileMenu}
//             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={handleOpenProfileDialog}>Profile</MenuItem>
//             <MenuItem onClick={handleOpenLogoutDialog}>Logout</MenuItem>
                
//           {userRole === 'admin'  && (
//             <MenuItem onClick={() => router.push('/dashboard')}>Dashboard</MenuItem>           
//           )}
//           </Menu>

//         </Toolbar>
//       </Container>
//       <Dialog open={logoutDialogOpen} onClose={handleCloseLogoutDialog}>
//         <DialogTitle>Confirm Logout</DialogTitle>

//         <DialogContent>
//           Are you sure you want to logout?
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
//           <Button onClick={handleLogout}>Logout</Button>
//         </DialogActions>

//       </Dialog>
//       <Dialog open={profileDialogOpen} onClose={handleCloseProfileDialog}>
//         <DialogContent>
//             <ProfileView params={{ id: userId }}/>         
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseProfileDialog}>Close</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={editDialogOpen} onClose={handleEditClose}>
//         <DialogTitle>Edit Skills</DialogTitle>
//         <DialogContent>
//           {userSkills.map((skill, index) => (
//             <TextField
//               key={index}
//               margin="dense"
//               label={`Skill ${index + 1}`}
//               type="text"
//               fullWidth
//               value={skill}
//               onChange={(e) => {
//                 const newSkills = [...userSkills];
//                 newSkills[index] = e.target.value;
//                 setUserSkills(newSkills);
//               }}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose}>Cancel</Button>
//           <Button onClick={handleSaveSkills}>Save</Button>
//         </DialogActions>
//       </Dialog>
//       {userSkills.length === 0 && <UploadCv open={editDialogOpen} handleClose={handleEditClose} userId={userId} />}
//     </AppBar>
//   );
// }

// export default ResponsiveAppBar;







  // "use client"
  // import React, { useState } from 'react';
  // import AppBar from '@mui/material/AppBar';
  // import Toolbar from '@mui/material/Toolbar';
  // import Typography from '@mui/material/Typography';
  // import Container from '@mui/material/Container';
  // import { Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
  // import { AccountCircle } from '@mui/icons-material';
  // import { useRouter } from 'next/navigation';

  // function ResponsiveAppBar() {
  //   const router = useRouter();
  //   const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  //   const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  //   const handleProfileClick = (e:any) => {
  //     setProfileAnchorEl(e.currentTarget);
  //   };

  //   const handleCloseProfileMenu = () => {
  //     setProfileAnchorEl(null);
  //   };

  //   const handleLogout = () => {
  //     localStorage.removeItem('access_token');
  //     localStorage.removeItem('role');
  //     localStorage.removeItem('adminId');
  //     localStorage.removeItem('first_name');
  //     localStorage.removeItem('gender');
  //     router.push('/login');
  //   };

  //   const handleOpenLogoutDialog = () => {
  //     setLogoutDialogOpen(true);
  //     handleCloseProfileMenu();
  //   };

  //   const handleCloseLogoutDialog = () => {
  //     setLogoutDialogOpen(false);
  //   };

  //   return (
  //     <AppBar position="static">
  //       <Container maxWidth="xl" sx={{ background: "#1c2a38" }}>
  //         <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
  //           <Typography
  //             variant="h6"
  //             noWrap
  //             component="a"
  //             href="#app-bar-with-responsive-menu"
  //             sx={{
  //               mr: 2,
  //               display: { xs: 'none', md: 'flex' },
  //               fontFamily: 'monospace',
  //               fontWeight: 700,
  //               letterSpacing: '.3rem',
  //               color: 'inherit',
  //               textDecoration: 'none',
  //             }}
  //           >
  //             LOGO
  //           </Typography>
  //           <Typography
  //             variant="h5"
  //             noWrap
  //             component="a"
  //             href="#app-bar-with-responsive-menu"
  //             sx={{
  //               mr: 2,
  //               display: { xs: 'flex', md: 'none' },
  //               flexGrow: 1,
  //               fontFamily: 'monospace',
  //               fontWeight: 700,
  //               letterSpacing: '.3rem',
  //               color: 'inherit',
  //               textDecoration: 'none',
  //             }}
  //           >
  //             LOGO
  //           </Typography>
  //           <Button onClick={handleProfileClick} sx={{ color: 'inherit' }}>
  //             <AccountCircle />
  //           </Button>
  //           <Menu
  //             anchorEl={profileAnchorEl}
  //             open={Boolean(profileAnchorEl)}
  //             onClose={handleCloseProfileMenu}
  //             anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  //             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  //             // getContentAnchorEl={null}
  //           >
  //             <MenuItem onClick={handleOpenLogoutDialog}>Logout</MenuItem>
  //             <MenuItem onClick={handleOpenLogoutDialog}>Profile</MenuItem>

  //           </Menu>
  //         </Toolbar>
  //       </Container>
  //       <Dialog open={logoutDialogOpen} onClose={handleCloseLogoutDialog}>
  //         <DialogTitle>Confirm Logout</DialogTitle>
  //         <DialogContent>
  //           Are you sure you want to logout?
  //         </DialogContent>
  //         <DialogActions>
  //           <Button onClick={handleCloseLogoutDialog}>Cancel</Button>
  //           <Button onClick={handleLogout}>Logout</Button>
  //         </DialogActions>
  //       </Dialog>
  //     </AppBar>
  //   );
  // }
  // export default ResponsiveAppBar;


  // ResponsiveAppBar.js
