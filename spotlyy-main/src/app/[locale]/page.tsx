import Header from "@/components/Header";
import { getSession } from "@/lib/authConfig";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const session = await getSession();
  const t = await getTranslations("HomePage");
  return (
    <div className="">
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold underline">{t("title")}</h1>
        <p>{t("about")}</p>
      </div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div className="py-4">
      {session?.isLoggedIn ? (
        <>
          <a href="/auth/logout">Logout</a>
        </>
      ) : (
        <>
          <a href="/auth/login">Login</a>
        </>
      )}
      </div>
    </div>
  );
}
