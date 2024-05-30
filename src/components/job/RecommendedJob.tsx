// // components/LocationComponent.js
// import { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix the default icon issue with Leaflet and React-Leaflet
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const LocationComponent = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);

//   const requestLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (err) => {
//           setError(err);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   };

//   return (
//     <div>
//       <button onClick={requestLocation}>Allow Access to Location</button>
//       {location && (
//         <MapContainer
//           center={[location.latitude, location.longitude]}
//           zoom={13}
//           style={{ height: '400px', width: '100%' }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={[location.latitude, location.longitude]}>
//             <Popup>
//               You are here.
//             </Popup>
//           </Marker>
//         </MapContainer>
//       )}
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default LocationComponent;





import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const containerStyle = {
  width: '100%',
  height: '200px',
};
const center = {
  lat: 0,
  lng: 0,
};
interface MapComponentProps {
  lat: number;
  lng: number;
}
const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
  const position = { lat, lng };
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={15}>
        <Marker position={position} />
      </GoogleMap>
    </LoadScript>
  );
};
export default React.memo(MapComponent);



// import * as React from 'react';
// import Box from '@mui/joy/Box';
// import CardContent from '@mui/joy/CardContent';
// import Typography from '@mui/joy/Typography';
// import { Card, Chip } from '@mui/material';
// import Link from 'next/link';
// import MapComponent from './MapComponent';
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
//   const createdAtDate = new Date(data.createdAt);
//   const formattedDate = createdAtDate.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });
//   // Define the color based on the job type
//   const jobTypeColor = data.job_type === 'part-time' ? 'blue' : 'green';
//   return (
//     <div>
//       <Link href={{ pathname: `/job/view/${data._id}` }} style={{ textDecoration: 'none' }}>
//         <Box
//           sx={{
//             width: '100%',
//             display: 'grid',
//             padding: '10px',
//             height: '400px',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
//             cursor: 'pointer',
//           }}
//         >
//           <Card sx={{ padding: '20px' }}>
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
//                   <MapComponent
//                     lat={data.company.location.coordinates.lat}
//                     lng={data.company.location.coordinates.lng}
//                   />
//                 </>
//               )}
//               <Chip
//                 label={data.job_type}
//                 variant="outlined"
//                 sx={{
//                   color: jobTypeColor,
//                   borderColor: jobTypeColor,
//                   width: "90px",
//                   height: "20px",
//                   marginTop: "20px",
//                   textAlign: "center",
//                   marginLeft: "65px"
//                 }}
//               />
//             </CardContent>
//           </Card>
//         </Box>
//       </Link>
//     </div>
//   );
// }



// import { useState } from 'react';
// const LocationComponent = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);
//   const requestLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         },
//         (err) => {
//           setError(err.message);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   };
//   return (
//     <div>
//       <button onClick={requestLocation}>Allow Access to Location</button>
//       {location && (
//         <div>
//           <p>Latitude: {location.latitude}</p>
//           <p>Longitude: {location.longitude}</p>
//         </div>
//       )}
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };
// export default LocationComponent;