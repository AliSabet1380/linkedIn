import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center mt-14  md:mt-10 w-full">
      <SignIn />
    </div>
  );
};

export default SignInPage;
