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
import useDataPopularProducts from "./useDataStatisticsAllProducts";

const AllProductsGraph: React.FC = () => {
  const { data } = useDataPopularProducts();

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
  console.log(data);
  return (
    <>
      <h1>Statistics Page</h1>
      <div id="productPopularContainer" style={style}>
        <ResponsiveContainer width="80%" height={300}>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AllProductsGraph;
