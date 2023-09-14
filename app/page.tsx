import Hello from "./(components)/hello";
import LoginInput from "./(components)/loginInput";

export default function Page() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <Hello />
          <LoginInput />
        </div>
      </div>
    </div>
  );
}
