const customerModel = require("../model/customerModel");
const feedbackModel = require("../model/feedbackModel");

async function getCustomerIdByEmailIdAndPassword(data) {
  try {
    const customer = await customerModel
      .findOne({ emailId: data.emailId, password: data.password })
      .select("_id");

    if (!customer) {
      return {
        response: "error",
        error: "Customer Not Found",
        statusCode: 400,
      };
    }

    return {
      response: customer,
      error: null,
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function addCustomer(data) {
  try {
    const receivedData = new customerModel({
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      mobile: data.mobile,
      password: data.password,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
    });

    const result = await receivedData.save();
    return {
      response: result,
      error: null,
      statusCode: 201,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function customerLogin(data) {
  try {
    const result = await customerModel.findOne({
      emailId: data.emailId,
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
        error: "Invalid Credentials",
        statusCode: 400,
      };
    }
  } catch (error) {
    return {
      response: false,
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function getAllCustomers() {
  try {
    const result = await customerModel.find({});
    return {
      response: result,
      error: null,
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      response: "error",
      error: "Internal Server Error",
      statusCode: 500,
    };
  }
}

async function getCustomerDetails(customerId) {
  try {
    const result = await customerModel.findById(customerId);
    if (result) {
      return {
        response: result,
        error: null,
        statusCode: 200,
      };
    } else {
      return {
        response: "error",
        error: "Invalid CustomerID",
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

async function deleteCustomerByCustomerId(customerId) {
  try {
    const result1 = await feedbackModel.delete({ customerId: customerId });
    if (result1) {
      const result = await customerModel.deleteOne({ _id: customerId });
      if (result.deletedCount > 0) {
        return {
          response: "Deleted Successfully",
          error: null,
          statusCode: 200,
        };
      } else {
        return {
          response: "Delete Unsuccessful",
          error: "Invalid CustomerID",
          statusCode: 400,
        };
      }
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

async function updateCustomer(data) {
  try {
    const result = await customerModel.findOneAndUpdate(
      { _id: data.customerId },
      data.newData,
      { new: true }
    );
    if (result) {
      return {
        response: "Successfully Updated",
        error: null,
        statusCode: 201,
      };
    } else {
      return {
        response: "error",
        error: "Invalid CustomerID",
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

module.exports = {
  getCustomerIdByEmailIdAndPassword,
  addCustomer,
  customerLogin,
  getAllCustomers,
  getCustomerDetails,
  deleteCustomerByCustomerId,
  updateCustomer,
};
