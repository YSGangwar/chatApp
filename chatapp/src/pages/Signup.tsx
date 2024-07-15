import { Button,Grid, Radio,
  Typography ,
    FormControl, 
    FormLabel, 
    FormControlLabel, 
    Alert,
    RadioGroup, 
    TextField} from '@mui/material';
import { useState } from 'react';
import axios  from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LoginFormFields } from '../utils/Interfaces';

export const Signup = () => {
  const {register , handleSubmit ,setError ,formState:{errors , isSubmitting}} = useForm<LoginFormFields>();
  const navigate = useNavigate();
  const formSubmit :SubmitHandler<LoginFormFields> = async ( data )=>{
      try {
          console.log(data);
          const response = await axios.post("http://localhost:3001/auth/signup",{
            data
          });
          if(response.data.code==200){
            alert(response.data.message);
            navigate("/");
          }
      } catch (error) {
          alert(error);
      }
  }

  return (
    <div className='custom-img-login h-screen bg-fixed bg-center bg-cover flex justify-center w-full items-center'>
      <div className='flex w-[60%] h-[80%] shadow-2xl shadow-black rounded-[22px] overflow-hidden'>
          <div className=' w-1/2  flex items-center justify-center custom-img-login bg-fixed bg-cover'>
              <h1 className='text-3xl'>S I G N - U P</h1>
          </div>
          <div className=' w-1/2 bg-white overflow-hidden flex  flex-col items-center justify-center '>
              <h1 className='text-2xl mb-10 underline hover:text-red-500'>Welcome </h1>
              <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col justify-center items-center gap-6 w-full mb-10'>
              <TextField
                {...register("name",{
                  required:"name is Required",
                  minLength:{
                      value:2,
                      message:"username must me of 2 length"
                  }
                  }) 
                }
                error={!!errors.name}
                id="outlined-error-helper-text"
                label="Display Name"
                type="text"
                helperText={errors.name ?.message}
              />
               <TextField
                {...register("phoneNo",{
                  required:"phoneNO is Required",
                  minLength:{
                      value:10,
                      message:"Phone NO must me of 10 length"
                  }
                  }) 
                }
                error={!!errors.phoneNo}
                id="outlined-error-helper-text"
                label="Phone NO"
                type="text"
                helperText={errors.phoneNo ?.message}
              />
               <TextField 
                  {...register("password",{
                    required:"Password is Required",
                    pattern:{
                        value:/\d/,
                        // value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:"password  must be of  Proper Format (Special, UpperCase, digit ,lowercase)"
                    }
                  })}
                  error={!!errors.password}
                  id="outlined-error-helper-text"
                  label="Password"
                  type="password"
                  helperText={errors.password?.message}
              
              />
               <Button 
                  variant='contained' color="success"
                  disabled={isSubmitting} type="submit"> 
                  Submit
              </Button>
              </form>

          </div>
      </div>
      
    </div>
  )
}