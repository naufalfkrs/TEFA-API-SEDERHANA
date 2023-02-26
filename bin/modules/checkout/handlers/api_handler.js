const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const getListCheckout = async (req, res) => {
  const getData = async => queryHandler.getListCheckout();
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Get all List Checkout Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Get all List Checkout", http.OK);
  };
  sendResponse(await getData())
};

const getLIstCheckoutByID = async (req, res) => {
  const { id } = req.params;
  const getData = async => queryHandler.getCartById(id);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Get Checkout Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Get Checkout", http.OK);
  };
  sendResponse(await getData())
};

const Checkout = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.checkout);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.checkout(result.data);
  };
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Checkout Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Checkout", http.OK);
  };
  sendResponse(await postRequest(validatePayload))
}

const deleteCheckout = async (req, res) => {
  const { id } = req.params;
  const deleteCart = async => commandHandler.deleteDetail(id);
  const sendResponse = async (result) => {
    result.err
      ? wrapper.response(res, "fail", result, "Delete Detail Pembelian Cancel", httpError.NOT_FOUND)
      : wrapper.response(res, "success", result, "Delete Detail Pembelian", http.OK);
  };
  sendResponse(await deleteCart())
} 

module.exports = {
  getListCheckout,
  getLIstCheckoutByID,
  Checkout,
  deleteCheckout,
};
