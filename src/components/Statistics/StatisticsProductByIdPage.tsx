import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useParams } from "react-router-dom";
import useDataStatisticsProductById from "./useDataStatisticsProductById";
import { format } from "date-fns";

const ProductByIdGraph: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data } = useDataStatisticsProductById(productId);
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
  const formattedData = data.map((entry) => ({
    ...entry,
    time: format(new Date(+entry.time), "yyyy-MM-dd"),
  }));

  return (
    <>
      <h1>Statistics Product Page</h1>
      <div id="productPopularContainer" style={style}>
        <ResponsiveContainer width="80%" height={300}>
          <LineChart width={500} height={300} data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="quantity"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ProductByIdGraph;
