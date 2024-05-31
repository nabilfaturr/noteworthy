// import { Button } from "@/components/ui/button";
// import { auth, signIn, signOut } from "@/lib/auth";
// import { redirect } from "next/navigation";

// export default async function Home() {
//   const session = await auth();
//   return (
//     <main>
//       <form
//         action={async () => {
//           "use server";

//           if (!session) {
//             await signIn("", { redirectTo: "/dashboard/all" });
//           } else {
//             redirect("/dashboard/all");
//           }
//         }}
//       >
//         <Button type="submit">Get Started</Button>
//       </form>
//       {session && (
//         <form
//           action={async () => {
//             "use server";

//             await signOut();
//           }}
//         >
//           <Button type="submit">Sign Out</Button>
//         </form>
//       )}
//       <pre>{JSON.stringify(session, null, 2)}</pre>
//     </main>
//   );
// }

import GetStarted from "@/components/shared/GetStarted";
import { Button } from "@/components/ui/button";
import { auth, signIn, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <GetStarted/>
      {session && (
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <Button type="submit">Sign Out</Button>
        </form>
      )}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
