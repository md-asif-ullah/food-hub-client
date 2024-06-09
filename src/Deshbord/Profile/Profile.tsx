import EmailSection from "./profile/EmailSection";
import InformationSection from "./profile/InformationSection";
import NumberSection from "./profile/NumberSection";

function Profile() {
  return (
    <div className="flex justify-center items-center h-full pb-20 mx-5">
      <div className="space-y-8 w-full max-w-3xl">
        <InformationSection />
        <NumberSection />
        <EmailSection />
      </div>
    </div>
  );
}

export default Profile;
