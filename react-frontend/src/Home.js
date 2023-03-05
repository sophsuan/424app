import { useAuth } from "./context/AuthProvider";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const { value } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    value.onLogin(data);
    console.log(data);
  };

  return (
    <>
      <h2 className="font-black text-zinc-900 text-5xl font-mono m-2 p-2">
        Home(Public)
      </h2>
      <div className="font-mono">
        <form className="w-[70%]" onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="...type username here"
            className="text-black pl-4 border-zinc-800 border-4 m-4 h-14 shadow-inner bg-zinc-100"
            {...register("uname", { required: true })}
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
            {...register("pwd", { required: true })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password?.type === "required" && (
            <p className="p-0 font-semibold italic" role="alert">
              Password is required
            </p>
          )}
          {/*<input type="submit" value="Login"/>*/}
          <button
            className="text-zinc-900 text-2xl font-black font-mono p-2 m-4 bg-white border border-zinc-900 border-4"
            type="submit"
          >
            Login
          </button>
          <button
            className="bg-zinc-900 font-black text-2xl font-mono p-2 m-4 mt-0 text-white rounded-none"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};
