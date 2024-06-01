import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";

export interface Job {
  _id: string;
  company: {
    _id: string
    company_name: string;
    location: {
      city: string,
      cordinates: {
        lat: number,
        lng: number
      }
    };
  };

  job_title: string;
  job_type: string,
  posted_date: string;
  createdAt: string
  salary: number,
  category: string,
  description: string,
  requirements: string[],
  status: string
  interviewScheduledAt: string
}

export interface JobState {
  jobs: Job[]
  singleJob: Job | null;
  totalCount: number;
  isSuccess: boolean
}

const initialState: JobState = {
  jobs: [],
  singleJob: null,
  totalCount: 0,
  isSuccess: false
}

interface Delete {
  _id: string
}

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    fetchData: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    fetchSingleJob: (state, action: PayloadAction<Job>) => {
      state.singleJob = action.payload; 
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    deleteData: (state, action: PayloadAction<Job>) => {
      
    },
    editData: (state, action: PayloadAction<Job>) => {
 
    },

  }
})

interface Params {
  q: string,
  job_type: string,
  category: string
}

export const fetchJobs = (params: Params): AppThunk<Promise<void>> => async (dispatch) => {
  const storedToken = localStorage.getItem("access_token")

  const response = await axios.post('http://localhost:5100/job/list',
  params,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
  dispatch(fetchData(response.data.data))

}

export const fetchJobById = (id: string): AppThunk<Promise<void>> => async (dispatch) => {
  const storedToken = localStorage.getItem("access_token");
  console.log("gvg");


  const response = await axios.post(`http://localhost:5100/job/view`, { _id: id }, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  dispatch(fetchSingleJob(response.data.data));
};

export const addNewJobs = ( formData: any ): AppThunk =>  async dispatch => {
  const storedToken = localStorage.getItem("access_token")

  formData.requirements = formData.requirements.join(", ");  // extra step  
  formData.requirements = JSON.stringify(formData.requirements);
  
  const response = await axios.post('http://localhost:5100/job/add', formData, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  const { data} = response;
  const addjobs = data.data
  dispatch(addJob(addjobs))

}

export const deleteJob = (_id: Delete): AppThunk => async (dispatch) => {
  const storedToken = localStorage.getItem("access_token")

  const response = await axios.patch("http://localhost:5100/job/delete",_id,
  {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  dispatch(deleteData(response.data.data))
}

export const editJob = ( jobData: FormData ): AppThunk => async (dispatch) => {
  const storedToken = localStorage.getItem("access_token")


      const response = await axios.patch("http://localhost:5100/job/edit", jobData, {        
          headers: {
              Authorization: `Bearer ${storedToken}`,
          }
      });
      dispatch(editData(response.data));
      

      
};

export const { fetchData, fetchSingleJob, addJob, deleteData, editData } = jobSlice.actions;
export default jobSlice.reducer


// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { AppThunk } from "../store";
// import axios from "axios";
// export interface Job {
//   _id: string;
//   company: {
//     company_name: string;
//     location: {
//       city: string,
//       coordinates: {
//         lat: number,
//         lng: number
//       }
//     };
//   };
//   job_title: string;
//   job_type: string;
//   posted_date: string;
//   salary: number;
//   category: string;
// }
// export interface JobState {
//   jobs: Job[];
//   singleJob: Job | null;
//   totalCount: number;
//   isSuccess: boolean;
// }
// const initialState: JobState = {
//   jobs: [],
//   singleJob: null,
//   totalCount: 0,
//   isSuccess: false
// };
// export const jobSlice = createSlice({
//   name: 'job',
//   initialState,
//   reducers: {
//     fetchData: (state, action: PayloadAction<Job[]>) => {
//       state.jobs = action.payload;
//     },
//     fetchSingleJob: (state, action: PayloadAction<Job>) => {
//       state.singleJob = action.payload;
//     },
//     addJob: (state, action: PayloadAction<Job>) => {
//       state.jobs.push(action.payload);
//     },
//     deleteData: (state, action: PayloadAction<string>) => {
//       state.jobs = state.jobs.filter(job => job._id !== action.payload);
//     },
//     editData: (state, action: PayloadAction<Job>) => {
//       const index = state.jobs.findIndex(job => job._id === action.payload._id);
//       if (index >= 0) {
//         state.jobs[index] = action.payload;
//       }
//     },
//   }
// });
// interface Params {
//   q: string,
//   job_type: string,
//   category: string
// }

// export const fetchJobs = (params: Params): AppThunk<Promise<void>> => async (dispatch) => {
//   const storedToken = localStorage.getItem("access_token");
//   const response = await axios.post('http://localhost:5100/job/list', params, {
//     headers: {
//       Authorization: `Bearer ${storedToken}`
//     }
//   });
//   dispatch(fetchData(response.data.data));
// };
// export const fetchJobById = (id: string): AppThunk<Promise<void>> => async (dispatch) => {
//   const storedToken = localStorage.getItem("access_token");
//   const response = await axios.post('http://localhost:5100/job/view', { _id: id }, {
//     headers: {
//       Authorization: `Bearer ${storedToken}`,
//     },
//   });
//   dispatch(fetchSingleJob(response.data.data));
// };
// export const addNewJobs = (formData: FormData): AppThunk => async dispatch => {
//   const storedToken = localStorage.getItem("access_token");
//   const response = await axios.post('http://localhost:5100/job/add', formData, {
//     headers: {
//       Authorization: `Bearer ${storedToken}`
//     }
//   });
//   dispatch(addJob(response.data.data));
// };
// export const deleteJob = (_id: string): AppThunk => async (dispatch) => {
//   const storedToken = localStorage.getItem("access_token");
//   await axios.patch("http://localhost:5100/job/delete", { _id }, {
//     headers: {
//       Authorization: `Bearer ${storedToken}`
//     }
//   });
//   dispatch(deleteData(_id));
// };
// export const editJob = (jobData: FormData): AppThunk => async (dispatch) => {
//   const storedToken = localStorage.getItem("access_token");
//   const response = await axios.patch("http://localhost:5100/job/edit", jobData, {
//     headers: {
//       Authorization: `Bearer ${storedToken}`,
//     }
//   });
//   dispatch(editData(response.data.data));
// };
// export const { fetchData, fetchSingleJob, addJob, deleteData, editData } = jobSlice.actions;
// export default jobSlice.reducer;






