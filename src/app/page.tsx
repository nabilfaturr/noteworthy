import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <form
        action={async () => {
          "use server";

          if (!session) {
            await signIn();
          } else {
            redirect("/dashboard");
          }
        }}
      >
        <Button type="submit">Get Started</Button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
