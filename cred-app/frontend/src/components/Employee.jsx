import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  deleteEmployee,
} from "../services/employeeService";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createEmployee(form);
    setForm({ name: "", email: "", role: "" });
    loadEmployees();
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    loadEmployees();
  };

  return (
    <div>
      <h2>Employee Management System</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        />
        <button type="submit">Add Employee</button>
      </form>

      <hr />

      {employees.map((emp) => (
        <div key={emp.id}>
          <h3>{emp.name}</h3>
          <p>{emp.email}</p>
          <p>{emp.role}</p>
          <button onClick={() => handleDelete(emp.id)}>
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Employee;