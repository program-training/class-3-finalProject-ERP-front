import { useQuery, gql } from '@apollo/client';

export const getGraph = gql`
  query Graf {
    graf {
      product_name
      quantity
    }
  }
`;

export const logIn = gql`
  query Graf {
    graf {
      product_name
      quantity
    }
  }
`;

export const signUp = gql`
  query Graf {
    graf {
      product_name
      quantity
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
