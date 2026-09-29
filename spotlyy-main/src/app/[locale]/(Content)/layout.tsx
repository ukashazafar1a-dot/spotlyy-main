import Header from "@/components/Header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <Header />
      <p>Site Layout</p>
      <div className="p-12 bg-slate-200">{children}</div>
    </main>
  );
}
