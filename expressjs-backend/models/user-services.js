const mongoose = require("mongoose");
const userModel = require("./user");

async function getUsers(name) {
  let result;
  if (name === undefined) {
    result = await userModel.find();
  }
  console.log(result);
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.find({ id: id });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user, pwd) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
