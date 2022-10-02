import BottomBar from "./BottomBar";
import TopBar from "./TopBar";

export default function Layout({ children }) {
  return (
    <div className="h-screen">
      <TopBar />
      {children}
      <BottomBar />
    </div>
  );
}
