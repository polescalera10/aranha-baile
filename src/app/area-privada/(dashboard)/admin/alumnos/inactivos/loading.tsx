import { ListPageSkeleton } from "@/app/area-privada/(dashboard)/_components/Skeletons";

export default function AlumnosInactivosLoading() {
  return <ListPageSkeleton rows={5} withAction={false} />;
}
