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

  if (Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  const newData = Object.entries(data).map(([, productData]) => ({
    name: productData.product_name,
    quantity: productData.quantity,
  }));

  return (
    <>
      <h1>Statistics Page</h1>
      <div id="productPopularContainer" style={style}>
        <ResponsiveContainer width="80%" height={300} >
          <BarChart width={500} height={300} data={newData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
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
