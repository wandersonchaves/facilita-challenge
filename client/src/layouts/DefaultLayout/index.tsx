import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

export function DefaultLayout() {
  return (
    <div className="max-w-6xl h-screen mx-auto my-20 px-10 rounded-lg bg-gray-800">
      <Header />
      <Outlet />
    </div>
  );
}
