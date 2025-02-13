import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((state: any) => state.user);

  


  return <div>{JSON.stringify(user)};</div>;
}
