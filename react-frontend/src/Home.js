import { ErrorResponse } from "@remix-run/router";
import { useAuth } from "./context/AuthProvider";
import React, { useState, useEffect } from "react";
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
      <h2 className="text-[60px] font-black text-blue-900">Home (Public)</h2>
      <div className="text-red-900">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="text-black pl-3 h-10 shadow-inner "
            {...register("uname", { required: true })}
            aria-invalid={errors.uname ? "true" : "false"}
          />
          {errors.uname?.type === "required" && (
            <p className="p-0 font-semibold italic" role="alert">
              Username is required
            </p>
          )}
          <input
            type="password"
            className="text-black mt-2 pl-3 h-10 shadow-inner"
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
            className="text-blue-900 bg-white border border-blue-900 border-4 rounded-none font-bold"
            type="submit"
          >
            Login
          </button>
          <button
            className="bg-blue-900 font- text-white rounded-none"
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
