import { useAuthContext } from "@/auth/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const { logout } = useAuthContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      logout();
    }
  }, []);

  return (
    <div className="hero min-h-screen bg-center bg-cover bg-[url(/auth.png)]">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="form-control">
            <a
              href={process.env.API_URL}
              //href="/"
              className="btn bg-red-600 text-white"
            >
              Login
            </a>
          </div>
      </div>
    </div>
  );
}
