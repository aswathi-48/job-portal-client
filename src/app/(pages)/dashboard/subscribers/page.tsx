"use client"
import { RootState } from '@/redux/store'
import { fetchSubscribedUser } from '@/redux/user/userSlice'
import { Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '@/components/style/Style.css'
const AdminViewSubscribers = () => {

   const dispatch = useDispatch<any>()
   const subscribers = useSelector((state:RootState) => state.user.users)
   console.log(subscribers);

    useEffect(() => {
        dispatch(fetchSubscribedUser())
    },[dispatch])

    const columns: GridColDef[] = [
        {
          field: 'id', headerName: 'ID',
          renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
      },
      { field: 'image', headerName: 'image ', width: 100,
      renderCell: (subscribers) => {
        return <>
        <img src={subscribers.row.image} alt="user" style={{ width: '50px', height: 'auto', borderRadius: "50px" }} />
    
        </>
      }
     },
        { field: 'first_name', headerName: ' Name', width: 100 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'date_of_birth', headerName: 'Date Of Birth', width: 100,
        renderCell: (params) => (
          <>
              {new Date(params.row.date_of_birth).toLocaleDateString('en-GB', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
              })}
          </>
      ), },
    ]
  return (
    <div>
      <Typography variant='h4'></Typography>
        <DataGrid
            getRowId={(row) => row._id}
            rows={subscribers}
            columns={columns}
            rowHeight={100}
            initialState={{
            pagination: { paginationModel: { pageSize: 3 } }
            }}
            pageSizeOptions={[3, 5, 20]}
        />
    </div>
  )
}

export default AdminViewSubscribers