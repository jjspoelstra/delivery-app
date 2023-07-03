import { useQuery, gql } from '@apollo/client';
import { ApolloProvider } from "@apollo/client";
import client from './apolloClient';

const GET_USER = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;

export default function UserPage() {
  const { loading, error, data } = useQuery(GET_USER, { variables: { id: 1 }, client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ApolloProvider>
      <div>
        <p>User ID: {data.user.id}</p>
        <p>User Name: {data.user.name}</p>
        <p>User Email: {data.user.email}</p>
      </div>
    </ApolloProvider>
    
  );
}
