
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const user = useSelector((state: any) => state.auth.user); // Type state as any
  console.log(user);
  return (
    <div>Dashboard</div>
  );
};

export default Dashboard;
