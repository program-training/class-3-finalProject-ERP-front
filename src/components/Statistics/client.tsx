import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const query = gql`
  query Graf {
    graf {
      product_name
      quantity
    }
  }
`;

export const registerDAtaQuery = gql`
query RegisterData {
  registerData {
    login_day
    login_count
  }
}
`;

export const subscription = gql`
subscription Graf {
    graf {
        product_name
        quantity
    }
}
`;

export const subscriptionToRegister = gql`
subscription Subscription {
  registerData {
    login_count
    login_day
  }
}
`;

export const UseDataStatisticsAllProducts = () => {
  const { data, loading, error, subscribeToMore } = useQuery(query);

  // Subscribe to updates
  React.useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: subscription,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        const newQuantity = subscriptionData.data.graf.quantity;
        return {
          graf: {
            ...prev.graf,
            quantity: newQuantity,
          },
        };
      },
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, [subscribeToMore]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  
  return (
    <div>
      <p>Product Name: {data.graf.product_name}</p>
      <p>Quantity: {data.graf.quantity}</p>
    </div>
  );
};


