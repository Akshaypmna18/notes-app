import Theme from "@/features/Theme";

function CommonHeader() {
  return (
    <div className="flex justify-between items-center text-primaryColor">
      <h2 className="text-[calc(1.5rem+1vw)] font-bold font-dancingScript">
        Aks Notes
      </h2>
      <Theme />
    </div>
  );
}

export default CommonHeader;
