import AdminCompanyView from '@/components/admin/AdminCompanyView'
import AdminJobView from '@/components/admin/AdminJobView'
import AdminUserView from '@/components/admin/AdminUserView'
import AdminViewSubscribers from '@/components/admin/AdminViewSubscribers'
import ProfileView from '@/components/admin/ProfileView'
import React from 'react'

const page = () => {
  return (
    <div style={{
      fontFamily:'monospace',
      fontWeight:"bold",
      fontSize: '32px',
      textAlign:'center',
      paddingTop:'10%',
    }}>
      Welcome To Admin Panel
        {/* <Button> </Button> */}
        {/* <AdminJobView/> */}
        {/* <AdminCompanyView/> */}
        {/* <ProfileView /> */}
        {/* <AdminUserView/>? */}
        {/* <AdminViewSubscribers/> */}
    </div>
  )
}

export default page