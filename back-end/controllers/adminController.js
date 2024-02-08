const express = require("express");
const adminModel = require("../model/adminModel");

async function addAdmin(data) {
  try {
    const receivedData = new adminModel({
      username: data.username,
      password: data.password,
    });
    const result = await receivedData.save();
    if (result) {
      return {
        response: result,
        error: null,
        statusCode: 201,
      };
    } else {
      return {
        response: "error",
        error: "Invalid username or password",
        statusCode: 400,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function adminLogin(data) {
  try {
    const result = await adminModel.findOne({
      username: data.username,
      password: data.password,
    });
    if (result) {
      return {
        response: true,
        error: null,
        statusCode: 200,
      };
    } else {
      return {
        response: false,
        error: "Invalid Username or Password",
        statusCode: 400,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      response: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

module.exports = { addAdmin, adminLogin };
