import { Redirect } from 'expo-router';

const Home = () => {
  // @ts-ignore
  return <Redirect href="/(auth)/welcome" />;
};

export default Home;
