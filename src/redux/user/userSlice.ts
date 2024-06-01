import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";
export interface User {
    userId: string,
    first_name: string,
    last_name: string,
    gender: string,
    date_of_birth: string,
    email: string,
    role: string,
    image: FileList,
    subscription: boolean,
    skills: string
}
export interface UserState {
    users: User[]
    profile: User | null
}
const initialState: UserState = {
    users: [],
    profile: null
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchSingleUser: (state, action: PayloadAction<User>) => {
            state.profile = action.payload;
        },
        fetchData: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        deleteData: (state, action: PayloadAction<User>) => {
            state.users = state.users.filter(user => user.userId !== action.payload.userId);
        },
        fetchSubscribers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.profile = action.payload;
        },
        editData: (state, action: PayloadAction<User>) => {
 
        },
    }
})
interface Delete {
    userId: string
}

export const fetchUserById = (id: string): AppThunk<Promise<void>> => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token");
    const response = await axios.post(`http://localhost:5100/user/profile`, { UserId: id }, {
        headers: {
            Authorization: `Bearer ${storedToken}`,
        },
    });
    dispatch(fetchSingleUser(response.data.data));
    console.log(response.data.data, "single job res");
};

export const fetchUser = (): AppThunk<Promise<void>> => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token");
    const response = await axios.post('http://localhost:5100/user/clients', {}, {
        headers: {
            Authorization: `Bearer ${storedToken}`
        }
    });
    dispatch(fetchData(response.data.data));
    console.log(response.data.data, "res");
}

export const deleteUser = (userId: Delete): AppThunk => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token");
    const response = await axios.patch("http://localhost:5100/user/delete", userId, {
        headers: {
            Authorization: `Bearer ${storedToken}`
        }
    });
    dispatch(deleteData(response.data.data));
}

export const fetchSubscribedUser = (): AppThunk<Promise<void>> => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token");
    const response = await axios.post('http://localhost:5100/user/list/subscribers', {}, {
        headers: {
            Authorization: `Bearer ${storedToken}`
        }
    });
    dispatch(fetchSubscribers(response.data.data));
    console.log(response.data.data, "res");
}

export const subscribeUser = (): AppThunk<Promise<void>> => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token");
    try {
        const response = await axios.post('http://localhost:5100/user/subscribe', {}, {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        });
        dispatch(updateUser(response.data.data));
        console.log(response.data.data, "Subscription successful");
    } catch (error) {
        console.error("Subscription failed", error);
    }
}

export const editUser = ( userData: FormData ): AppThunk => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token")
  
  
        const response = await axios.patch("http://localhost:5100/user/edit", userData, {        
            headers: {
                Authorization: `Bearer ${storedToken}`,
            }
        });
        dispatch(editData(response.data.data));
        console.log(response.data.data);
        
  
        
  };
  

export const { fetchSingleUser, fetchData, deleteData, fetchSubscribers, updateUser, editData } = userSlice.actions;
export default userSlice.reducer;


// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { AppThunk } from "../store";
// import axios from "axios";


// export interface User {
//     userId: string,
//     first_name: string,
//     last_name: string,
//     gender: string,
//     date_of_birth: string,
//     email: string,
//     role: string,
//     image: FileList,
//     subscription: boolean
// }

// export interface UserState {
//     users: User[]
//     profile: User | null

// }
// const initialState: UserState = {
//     users: [],
//     profile: null
//   }

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         fetchSingleUser: (state, action: PayloadAction<User>) => {
//             state.profile = action.payload; 
//           },
//           fetchData: (state, action: PayloadAction<User[]>) => {
//             state.users = action.payload;
//           },
//           deleteData: (state, action: PayloadAction<User>) => {

//           },
//           fetchSubscribers: (state, action: PayloadAction<User[]>) => {
//             state.users = action.payload;
//           },

//     }
// })
// interface Delete {
//   userId: string
// }


// export const fetchUserById = (id: string): AppThunk<Promise<void>> => async (dispatch) => {
//     const storedToken = localStorage.getItem("access_token");

//     const response = await axios.post(`http://localhost:5100/user/profile`, { _id: id }, {
//       headers: {
//         Authorization: `Bearer ${storedToken}`,
//       },
//     });

//     dispatch(fetchSingleUser(response.data.data));
//     console.log(response.data.data, "single job res");
//   };

//   export const fetchUser = (): AppThunk<Promise<void>> => async (dispatch) => {
//     const storedToken = localStorage.getItem("access_token")

//     const response = await axios.post('http://localhost:5100/user/clients',
//       {
//         headers: {
//           Authorization: `Bearer ${storedToken}`
//         }
//       })
//     dispatch(fetchData(response.data.data))
//     console.log(response.data.data, "res");

//   }

//   export const deleteUser = (userId: Delete): AppThunk => async (dispatch) => {
//     const storedToken = localStorage.getItem("access_token")

//     const response = await axios.patch("http://localhost:5100/user/delete",userId,
//     {
//       headers: {
//         Authorization: `Bearer ${storedToken}`
//       }
//     })
//     dispatch(deleteData(response.data.data))
//   }

//   export const fetchSubscribedUser = (): AppThunk<Promise<void>> => async (dispatch) => {
//     const storedToken = localStorage.getItem("access_token")

//     const response = await axios.post('http://localhost:5100/user/list/subscribers',
//       {
//         headers: {
//           Authorization: `Bearer ${storedToken}`
//         }
//       })
//     dispatch(fetchSubscribers(response.data.data))
//     console.log(response.data.data, "res");

//   }


// export const { fetchSingleUser, fetchData, deleteData, fetchSubscribers } = userSlice.actions;
// export default userSlice.reducer

