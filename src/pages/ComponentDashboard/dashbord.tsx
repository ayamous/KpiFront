
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const Dashboard = () => {
  const data = [
    { name: "Nov", users: 40 },
    { name: "Dec", users: 30 },
    { name: "Janv", users: 20 },
    { name: "Fev", users: 10 },
  ];

  return (
    <div className="app">
        <div className="formCls">
      <h1 className="titleDshbrd">DASHBOARD</h1>
      <h1 className="titleH1">TOTAL DES VALEURS NON SAISIES :<span>48</span> </h1>
      <div className="formlistAdd">
        
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
