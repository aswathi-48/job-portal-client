import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import axios from "axios";


export interface Company {
  _id : string;
    email: string,
    company_name: string,
    description: string,
    location: {
        city: string,
        cordinates: {
          lat: number
          lng: number
        }
    },
    user: {
      first_name: string,
      role: string
    }
}
export interface CompanyState {
    companies: Company[]
}
const initialState: CompanyState = {
    companies: []
}

interface Delete {
  comapny_id: string
 }

export const companyslice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        fetchData: (state, action: PayloadAction<Company[]>) => {
            state.companies = action.payload;
          },
          deleteData: (state, action: PayloadAction<Company>) => {

          },
          addData: (state, action: PayloadAction<Company>) => {
            state.companies.push(action.payload);
          },
          editData: (state, action: PayloadAction<Company>) => {
 
          },
    }
})

interface Params {
    q: string
  }

export const fetchCompany = ( params: Params): AppThunk<Promise<void>> => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token")
    
    
    const response = await axios.post('http://localhost:5100/company/list',
    params,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    dispatch(fetchData(response.data.data))

  }

  export const addNewCompany = ( formData: FormData ): AppThunk =>  async dispatch => {
    const storedToken = localStorage.getItem("access_token")!
  
    const response = await axios.post('http://localhost:5100/company/add', formData, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })

    dispatch(addData(response.data.data))
    console.log(response.data.data, "res ADD");
  
  }
  
  export const editCompany = ( CompanyData: FormData ): AppThunk => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token")
  
  
        const response = await axios.patch("http://localhost:5100/company/edit", CompanyData, {        
            headers: {
                Authorization: `Bearer ${storedToken}`,
            }
        });
        dispatch(editData(response.data));
        console.log(response.data.data);
        
  
        
  };
  
  export const deleteCompany = (comapny_id: Delete): AppThunk => async (dispatch) => {
    const storedToken = localStorage.getItem("access_token")
    const response = await axios.patch("http://localhost:5100/company/delete",comapny_id,
    {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
    dispatch(deleteData(response.data.data))

  }
export const { fetchData, deleteData, editData, addData } = companyslice.actions
export default companyslice.reducer