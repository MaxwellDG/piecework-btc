import SignupInput from "../../(components)/signupInput";

// todo 'Hello' should change to a random greeting in any language 
// with the defintion next to it to explain it's a greeting in some language

export default function Page() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello</h1>
          <p className="py-6">Create an account for your organization</p>
          <SignupInput />
        </div>
      </div>
    </div>
  );
}
