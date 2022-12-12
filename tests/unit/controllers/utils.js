module.exports = {
  mockRequest: () => {
    const req = {}
    req.body = jest.fn().mockReturnValue(req)
    req.params = jest.fn().mockReturnValue(req)
    return req
  },

  mockResponse: () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res)
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  },
  mockModel: () => {
    const model = {};
    model.create = jest.fn();
    model.ModelError = class Err extends Error {
      constructor(message) {
        super(message);
      }
    } ;
    return model;
  }
}