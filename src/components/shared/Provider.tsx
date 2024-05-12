import { auth, signIn } from "@/lib/auth";

const Provider = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  return <>{children}</>;
};

export default Provider;
