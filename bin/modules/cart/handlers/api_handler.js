const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const getAllCart = async (req, res) => {
  const getData = async => queryHandler.getAllCart();
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Get all Cart Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Get all Cart", http.OK);
  };
  sendResponse(await getData())
};

const getCartById = async (req, res) => {
  const { id } = req.params;
  const getData = async => queryHandler.getCartById(id);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Get Cart Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Get Cart", http.OK);
  };
  sendResponse(await getData())
};

const createCart = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.cart);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.insertCart(result.data);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Insert Cart Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Insert Cart", http.OK);
  };
  sendResponse(await postRequest(validatePayload))
}

const updateCart = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const postRequest = async (result, id) => {
    if (result.err) {
      return result;
    }
    return commandHandler.updateCart(result, id);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Update Cart Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Update Cart", http.OK);
  };
  sendResponse(await postRequest(payload, id))
}

const deleteCart = async (req, res) => {
  const { id } = req.params;
  const deleteCart = async => commandHandler.deleteCart(id);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Delete Cart Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Delete Cart", http.OK);
  };
  sendResponse(await deleteCart())
} 

module.exports = {
  getAllCart,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
};
