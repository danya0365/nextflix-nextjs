import { ProfileEditView } from "@/src/presentation/components/profile/ProfileEdit";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfileEditPage({ params }: PageProps) {
  const { id } = await params;
  
  return <ProfileEditView profileId={id} />;
}
