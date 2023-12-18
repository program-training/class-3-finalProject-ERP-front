import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useDataRegisteredStatistics from "./useDataRegisteredStatistics";

const dateStart = "2023-12-01";
const dateEnd = "2024-01-01";

const RegisteredStatistics: React.FC = () => {
  const { data } = useDataRegisteredStatistics(dateStart, dateEnd);
  console.log(data);

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
  };

  if (!data) {
    return <div>Data is not available</div>;
  }
  return (
    <>
      <h1>Statistics Registered</h1>
      <div id="productPopularContainer" style={style}>
        <ResponsiveContainer width="80%" height={300}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="login_day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="login_count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default RegisteredStatistics;
