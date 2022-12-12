const employeeController = require('../../../server/controllers/employee.controller');
const { mockRequest, mockResponse, mockModel } = require('./utils');
const { HttpError } = require('http-errors')


const employee = {
  first_name: 'test',
  last_name: 'subject',
  role: 'tester',
  first_day_at_work: (new Date()).toISOString(),
  team_id: 1,
  manager_id: 2,
};

describe('Employee controller', () => {
  let req;
  let res;
  let model;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    model = mockModel();
  })

  test('should create new employee', async () => {
    const middleware = employeeController.create({ employee: model });
    req.body = employee;
    const modelRetVal = { id: 1 };
    model.create.mockReturnValue(modelRetVal);

    await middleware(req, res);

    expect(model.create).toHaveBeenCalledWith(employee);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(modelRetVal);
  });

  test('should send 400 in case of model error', async () => {
    const middleware = employeeController.create({ employee: model });
    req.body = employee;

    model.create.mockImplementation(() => Promise.reject(new model.ModelError()));

    try {
      await middleware(req, res);
      throw new Error('middleware did not throw an error.')
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toEqual(400);
    }

    expect(model.create).toHaveBeenCalledWith(employee);

  });
});