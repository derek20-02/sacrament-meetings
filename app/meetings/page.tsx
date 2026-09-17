import AllMeetings from "@/components/AllMeetings";

export default function Meetings() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 mt-4 p-4">
        <h1 className="text-4xl font-bold text-center">Meetings</h1>
        <p className="text-lg text-center text-gray-200">
          View all upcoming sacrament meetings and their details.
        </p>
      </section>
     <AllMeetings />
    </>
  );
}