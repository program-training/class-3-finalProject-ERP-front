import React from "react";
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
import useDataPopularProducts from "./useDataPopularProducts";

const ProductGraph: React.FC = () => {
  const { data } = useDataPopularProducts();

  if (!data) {
    return <div>Data is not available</div>;
  }

  if (Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  const newData = Object.entries(data).flatMap(([productName, productData]) =>
    productData.time.map(({ time, quantity }) => ({
      name: `${productName} - ${time}`,
      quantity,
    }))
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={newData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        {console.log(newData)}
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductGraph;
