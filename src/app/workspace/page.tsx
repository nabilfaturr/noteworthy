import Container from "@/components/shared/Container";
import GridWrapper from "@/components/shared/GridWrapper";
import Mainbar from "@/components/shared/Mainbar";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { auth, signIn } from "@/lib/auth";
import React from "react";

const NotesPage = async () => {
  const session = await auth();

  if (!session) {
    await signIn();
  }

  const userInfo = session?.user;

  const userId = session?.user?.id as string;

  return (
    <Container>
      <Topbar />
      <GridWrapper>
        <Sidebar userInfo={userInfo} userId={userId} />
        <Mainbar userId={userId} />
      </GridWrapper>
    </Container>
  );
};

export default NotesPage;
