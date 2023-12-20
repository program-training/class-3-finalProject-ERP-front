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
import useDataStatisticsAllProducts from "./useDataStatisticsAllProducts";

const AllProductsGraph: React.FC = () => {
  const { dataArray, data:data1 } = useDataStatisticsAllProducts();

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
  };

  if (!dataArray) {
    return <div>Data is not available</div>;
  }
  console.log(data1.graf);
  
  return (
    <>
      <h1>Statistics Page</h1>
      <div id="productPopularContainer" style={style}>
        <ResponsiveContainer width="80%" height={300}>
          <BarChart width={500} height={300} data={dataArray}>
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
