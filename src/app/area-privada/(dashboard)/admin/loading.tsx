import {
  CardSkeleton,
  PageHeaderSkeleton,
} from "@/app/area-privada/(dashboard)/_components/Skeletons";

export default function AdminLoading() {
  return (
    <>
      <PageHeaderSkeleton />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <CardSkeleton lines={2} />
        <CardSkeleton lines={2} />
        <CardSkeleton lines={2} />
        <CardSkeleton lines={2} />
      </div>
    </>
  );
}
