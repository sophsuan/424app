import { useAuth } from "./context/AuthProvider";
import React, { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Register = () => {
  const navigate = useNavigate();
  const { value } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(
    (userData) => {
      return Axios.post("/account/register", userData);
    },
    {
      onSuccess: () => {
        navigate("/home");
      },
    }
  );

  const onSubmit = (data) => {
    mutation.mutate({ userid: data.uname, password: data.pwd });
    console.log(data);
  };

  return (
    <>
      <h2 className="text-[60px] font-black text-blue-900">Register</h2>
      <div className="text-red-900">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="text-black pl-3 mb-2 h-10 shadow-inner "
            {...register("uname", {
              required: true,
            })}
            aria-invalid={errors.uname ? "true" : "false"}
          />
          {errors.uname?.type === "required" && (
            <p className="p-0 font-semibold italic" role="alert">
              Username is required
            </p>
          )}
          <input
            className="mb-2 h-10 shadow-inner "
            {...register("pwd", {
              required: true,
              patten:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password?.type === "required" && (
            <p className="p-0 font-semibold italic" role="alert">
              Password is required
            </p>
          )}
          <button
            className="text-white bg-blue-900 font-bold rounded-none"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};
