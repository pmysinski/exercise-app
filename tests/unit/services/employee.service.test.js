const EmployeeService = require('../../../server/services/employee.service');

const employee = {
  first_name: 'test',
  last_name: 'subject',
  role: 'tester',
  first_day_at_work: (new Date()).toISOString(),
  team_id: 1,
  manager_id: 2,
};

const team = {
  id: 1,
  name: 'asdteam'
}


describe('API - teams', () => {
  let modelsMock;
  let service;
  beforeEach(() => {
    modelsMock = {
      team: {
        create: jest.fn(),
        findOne: jest.fn()
      },
      employee: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
      },
    };
    service = EmployeeService(modelsMock);
  });

  test('should create an employee', async () => {
    const newId = 3;
    modelsMock.team.findOne.mockImplementation((x) => x.id === employee.team_id ? team : undefined);
    modelsMock.employee.findOne.mockImplementation((x) => x.id === employee.manager_id ? team : undefined);
    modelsMock.employee.create.mockImplementation(() => ({ id: newId }));
    
    const retVal = await service.create(employee);

    expect(modelsMock.employee.create).toBeCalledWith(
      expect.objectContaining(employee)
    );
    expect(retVal).toEqual({ id: newId });
  });

  test('should update an employee', async () => {
    const id = 1;
    modelsMock.team.findOne.mockImplementation((x) => x.id === employee.team_id ? team : undefined);
    modelsMock.employee.findOne.mockImplementation((x) => x.id === employee.manager_id ? team : undefined);
    
    await service.update(id, employee);

    expect(modelsMock.employee.update).toBeCalledWith(
      id,
      expect.objectContaining(employee)
    );
  });
});