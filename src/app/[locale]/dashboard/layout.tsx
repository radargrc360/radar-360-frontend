import Header from "../../ui/dashboard/Header";
import Menu from "../../ui/dashboard/Menu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-primary text-white py-5 px-3 flex flex-col gap-5">
      <Header />
      <div className="flex w-full min-h-96 gap-2 flex-1">
        <Menu />
        <div className="flex-1 h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
