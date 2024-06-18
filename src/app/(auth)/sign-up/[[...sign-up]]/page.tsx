import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex items-center mt-14 md:mt-10 justify-center w-full">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
