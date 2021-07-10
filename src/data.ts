export interface IEmployeeRow {
  "Employee First Name": string;
  "Employee Last Name": string;
  "Employee Number": string;
  "Employee Nationality": string;
  "Employee National ID/Passport No": string;
  "Employee Date Of Birth": string;
  "Employee Gender": string;
  "Employee Phone No": string;
  "Employee Email": string;
  "Employee Addess": string;
  "Employee Benefit Class": string;
  "Employee Occupation Class": string;
  "Dependent First Name": string;
  "Dependent Last Name": string;
  Relationship: string;
  "Dependent Nationality": string;
  "Dependent National ID/Passport No": string;
  "Dependent Date Of Birth": string;
  "Dependent Gender": string;
  "Dependent Phone No": string;
  "Dependent Email": string;
  "Dependent Addess": string;
  "Dependent Benefit Class": string;
  "Dependent Occupation Class": string;
}

export interface IPersonalData {
  "First Name": string;
  "Last Name": string;
  Nationality: string;
  "National ID/Passport No": string;
  "Date Of Birth": string;
  Gender: string;
  "Phone No": string;
  Email: string;
  Addess: string;
  "Benefit Class": string;
  "Occupation Class": string;
}

export interface IDependentData extends IPersonalData {
  Relationship: string;
}

export interface IEmployeeData extends IPersonalData {
  "Employee Number": string;
  denpendents: IDependentData[];
}

export const parseEmployeeRows = (rows: IEmployeeRow[]): IEmployeeData[] => {
  const employees: IEmployeeData[] = rows
    .map((row) => {
      return {
        "First Name": row["Employee First Name"],
        "Last Name": row["Employee Last Name"],
        "Employee Number": row["Employee Number"],
        Nationality: row["Employee Nationality"],
        "National ID/Passport No": row["Employee National ID/Passport No"],
        "Date Of Birth": row["Employee Date Of Birth"],
        Gender: row["Employee Gender"],
        "Phone No": row["Employee Phone No"],
        Email: row["Employee Email"],
        Addess: row["Employee Addess"],
        "Benefit Class": row["Employee Benefit Class"],
        "Occupation Class": row["Employee Occupation Class"],
        denpendents: [],
      };
    })
    .filter((current, index, thisArg) => {
      return (
        thisArg.findIndex((value) => {
          return current["Employee Number"] === value["Employee Number"];
        }) === index
      );
    });

  rows
    .filter((value) => {
      return value["Dependent National ID/Passport No"] !== undefined;
    })
    .map((value) => {
      const employeeNumber = value["Employee Number"];
      const dependent: IDependentData = {
        "First Name": value["Dependent First Name"],
        "Last Name": value["Dependent Last Name"],
        Relationship: value.Relationship,
        Nationality: value["Dependent Nationality"],
        "National ID/Passport No": value["Dependent National ID/Passport No"],
        "Date Of Birth": value["Dependent Date Of Birth"],
        Gender: value["Dependent Gender"],
        "Phone No": value["Dependent Phone No"],
        Email: value["Dependent Email"],
        Addess: value["Dependent Addess"],
        "Benefit Class": value["Dependent Benefit Class"],
        "Occupation Class": value["Dependent Occupation Class"],
      };

      const employee = employees.find((employee) => {
        return employee["Employee Number"] === employeeNumber;
      });

      if (employee) {
        employee.denpendents.push(dependent);
      }

      return employee;
    });

  console.log(employees);

  return employees;
};
