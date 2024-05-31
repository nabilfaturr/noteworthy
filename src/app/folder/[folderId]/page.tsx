import Container from "@/components/shared/Container";
import FolderWrapper from "@/components/shared/FolderWrapper";
import GridWrapper from "@/components/shared/GridWrapper";
import Mainbar from "@/components/shared/Mainbar";
import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import { auth, signIn } from "@/lib/auth";

import React from "react";

const FolderPage = async ({ params }: { params: { folderId: string } }) => {
  const { folderId } = params;
  const session = await auth();

  if (!session) {
    await signIn();
  }

  const userInfo = session?.user;

  const userId = session?.user?.id as string;

  return (
    <Container>
      <Topbar />
      <FolderWrapper userId={userId} folderId={folderId} userInfo={userInfo} />
    </Container>
  );
};

export default FolderPage;
