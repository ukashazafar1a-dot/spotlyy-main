import Header from "@/components/Header";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-green-900 p-12 text-white ">
      <Header />
      <p>Profile Layout</p>
      {children}
    </main>
  );
}
