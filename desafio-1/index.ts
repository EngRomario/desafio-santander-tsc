interface IEmployee {
  code: number;
  name: string;
}

const employee: IEmployee = {
  code: 10,
  name: "John Smith",
};

document.getElementById("employee-name")!.innerText = employee.name;
document.getElementById("employee-code")!.innerText = employee.code.toString();
