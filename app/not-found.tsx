import Link from "next/link";

export default function NotFound() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h2 className="text-5xl font-bold">Not Found</h2>
          <p className="mb-6">Could not find requested resource</p>
          <Link className="btn btn-primary"  href="/">Return Home</Link>
        </div>
      </div>
    </div>
  );
}
