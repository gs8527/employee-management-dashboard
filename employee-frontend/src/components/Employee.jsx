import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Employee({ darkMode }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const internCount = employees.filter(
  (emp) => emp.role.toLowerCase() === "intern"
).length;

const engineerCount = employees.filter(
  (emp) => emp.role.toLowerCase().includes("engineer")
).length;

const otherCount =
  employees.length - internCount - engineerCount;

const chartData = {
  labels: ["Interns", "Engineers", "Others"],
  datasets: [
    {
      label: "Employees",
      data: [
        internCount,
        engineerCount,
        otherCount,
      ],
      backgroundColor: [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
      ],
      borderRadius: 8,
    },
  ],
};
const pieData = {
  labels: ["Interns", "Engineers", "Others"],
  datasets: [
    {
      data: [
        internCount,
        engineerCount,
        otherCount,
      ],
      backgroundColor: [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
      ],
    },
  ],
};
  const loadEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

   if (editId) {
  await updateEmployee(editId, form);
  setMessage("✅ Employee Updated Successfully");
  setEditId(null);
} else {
  await createEmployee(form);
  setMessage("✅ Employee Added Successfully");
}

setTimeout(() => {
  setMessage("");
}, 5000);

    setForm({
      name: "",
      email: "",
      role: "",
    });

    loadEmployees();
  };

  const handleDelete = async (id) => {
  await deleteEmployee(id);

  setMessage("✅ Employee Deleted Successfully");

  setTimeout(() => {
    setMessage("");
  }, 3000);

  loadEmployees();
};
const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(employees);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(data, "Employees.xlsx");
};
const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Employee Report", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["ID", "Name", "Email", "Role"]],
    body: employees.map((emp) => [
      emp.id,
      emp.name,
      emp.email,
      emp.role,
    ]),
  });

  doc.save("Employees_Report.pdf");
};
  return (
    <div
  className="w-full max-w-4xl mx-auto"
  style={{
    color: "inherit",
  }}
>
{message && (
  <div
    style={{
      position: "sticky",
      top: "10px",
      zIndex: 1000,
      background: "#dcfce7",
      color: "#166534",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "15px",
      fontWeight: "bold",
      textAlign: "center",
    }}
  >
    {message}
  </div>
)}
      {/* STATS CARDS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            background: darkMode ? "#1f2937" : "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>👥 Total Employees</h3>
          <h1>{employees.length}</h1>
        </div>

        <div
          style={{
            flex: 1,
            background: darkMode ? "#1f2937" : "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>💼 Interns</h3>
          <h1>{internCount}</h1>
        </div>

        <div
          style={{
            flex: 1,
            background: darkMode ? "#1f2937" : "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>👨‍💻 Engineers</h3>
          <h1>{engineerCount}</h1>
        </div>
      </div>
<button
  onClick={exportToExcel}
  className="bg-green-600 text-white px-4 py-2 rounded mb-4"
>
  📥 Export Employees to Excel
</button>
<button
  onClick={exportToPDF}
  className="bg-red-600 text-white px-4 py-2 rounded mb-4 ml-2"
>
  📄 Export PDF Report
</button>
<div
  style={{
    background: darkMode ? "#1f2937" : "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  }}
>
  <h2
    style={{
      marginBottom: "15px",
      textAlign: "center",
    }}
  >
    📊 Employee Roles Distribution
  </h2>

  <Bar data={chartData} />
  <div
  style={{
    background: darkMode ? "#1f2937" : "white",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "20px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "15px",
    }}
  >
    🥧 Employee Distribution
  </h2>

  <div
    style={{
      width: "350px",
      margin: "0 auto",
    }}
  >
    <Pie data={pieData} />
  </div>
</div>
</div>
<div
  style={{
    marginBottom: "15px",
    display: "flex",
    gap: "10px",
  }}
>
  <button
    onClick={() => setFilterRole("All")}
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    All
  </button>

  <button
    onClick={() => setFilterRole("Intern")}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    Interns
  </button>

  <button
    onClick={() => setFilterRole("Engineer")}
    className="bg-purple-600 text-white px-4 py-2 rounded"
  >
    Engineers
  </button>
</div>
      {/* SEARCH */}
      <div className="p-4 rounded-xl shadow-md mb-6"
style={{
  background: darkMode ? "#1f2937" : "white",
}}>
        <input
  type="text"
  placeholder="🔍 Search Employee..."
  className="w-full p-2 border rounded"
  style={{
    background: darkMode ? "#374151" : "white",
    color: darkMode ? "white" : "black",
    border: darkMode
      ? "1px solid #6b7280"
      : "1px solid #d1d5db",
  }}
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl shadow-md mb-6"
style={{
  background: darkMode ? "#1f2937" : "white",
}}
      >
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Update Employee" : "Add Employee"}
        </h2>

        <input
  className="w-full p-2 border mb-3 rounded"
  style={{
    background: darkMode ? "#374151" : "white",
    color: darkMode ? "white" : "black",
  }}
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
  className="w-full p-2 border mb-3 rounded"
  style={{
    background: darkMode ? "#374151" : "white",
    color: darkMode ? "white" : "black",
  }}
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
  className="w-full p-2 border mb-3 rounded"
  style={{
    background: darkMode ? "#374151" : "white",
    color: darkMode ? "white" : "black",
  }}
          placeholder="Role"
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <div
  className="rounded-xl shadow overflow-hidden"
  style={{
    background: darkMode ? "#1f2937" : "white",
  }}
>
  <table className="w-full">
    <thead>
      <tr style={{ background: "#2563eb", color: "white" }}>
        <th style={{ padding: "12px" }}>Name</th>
        <th style={{ padding: "12px" }}>Email</th>
        <th style={{ padding: "12px" }}>Role</th>
        <th style={{ padding: "12px" }}>Actions</th>
      </tr>
    </thead>

    <tbody
  style={{
    color: darkMode ? "white" : "black",
  }}
>
  {employees
    .filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((emp) =>
      filterRole === "All"
        ? true
        : emp.role
            .toLowerCase()
            .includes(filterRole.toLowerCase())
    )
    .map((emp) => (
      <tr
        key={emp.id}
        style={{
          color: darkMode ? "white" : "black",
        }}
      >
        <td
          style={{
            padding: "12px",
            textAlign: "center",
          }}
        >
          {emp.name}
        </td>

        <td
          style={{
            padding: "12px",
            textAlign: "center",
          }}
        >
          {emp.email}
        </td>

        <td
          style={{
            padding: "12px",
            textAlign: "center",
          }}
        >
          {emp.role}
        </td>

        <td
          style={{
            padding: "12px",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => {
              setEditId(emp.id);
              setForm({
                name: emp.name,
                email: emp.email,
                role: emp.role,
              });
            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>

          {" "}

          <button
            onClick={() => handleDelete(emp.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
</tbody>
  </table>
</div>
    </div>
  );
}

export default Employee;