import { useAuth } from "./context/AuthProvider";
import React from "react";
import { useMutation } from "react-query";
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
      return Axios.post("/users/register", userData);
    },
    {
      onSuccess: (data) => {
        console.log("register", data);
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
      <h2 className="font-black text-zinc-900 text-5xl font-mono m-2 p-2">
        Register
      </h2>
      <div className="text-zinc-900 font-mono">
        <form className="w-[80%]" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="...type username here"
            className="text-black pl-4 border-zinc-800 border-4 m-4 mt-0 h-14 shadow-inner bg-zinc-100"
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
            placeholder="...type password here"
            type="password"
            className="text-black pl-4 border-zinc-800 border-4 m-4 mt-0 h-14 shadow-inner bg-zinc-100"
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
            className="bg-zinc-900 font-black text-2xl font-mono p-2 m-4 mt-0 text-white rounded-none"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};
