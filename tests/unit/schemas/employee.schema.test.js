const employeeSchema = require('../../../server/schemas/employee.schema');

const employee = {
  first_name: 'test',
  last_name: 'subject',
  role: 'tester',
  first_day_at_work: (new Date()).toISOString(),
  team_id: 1,
  manager_id: 2,
};


describe('Validation employee ', () => {

  test('It should validate an employee POST', async () => {
    const validation = () => employeeSchema.postSchema.validateSync({
      body: employee
    });

    expect(validation).not.toThrowError();
  });

  test('It should not validate an employee POST with empty role', async () => {
    const validation = () => employeeSchema.postSchema.validateSync({
      body: { ...employee, role: '' }
    });

    await expect(validation).toThrowError();
  });

  test('It should not validate an employee POST with missing property', async () => {
    const missingFirstNameEmployeee = { ...employee };
    delete missingFirstNameEmployeee.first_name;
    const validation = () => employeeSchema.postSchema.validateSync({
      body: missingFirstNameEmployeee
    });

    await expect(validation).toThrowError();
  });

  // ...

});