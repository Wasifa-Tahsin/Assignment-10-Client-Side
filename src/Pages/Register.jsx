import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";





const Register = () => {
  const {
    createNewUser,
    setUser,
    updateProfileUser,
    signInWithGoogle,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false); 

  const validatePassword = (password) => {
    const errors = {};
    if (!/[A-Z]/.test(password)) {
      errors.uppercase = "Password must have at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      errors.lowercase = "Password must have at least one lowercase letter.";
    }
    if (password.length < 6) {
      errors.length = "Password must be at least 6 characters long.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const name = form.get("name");
    const email = form.get("email");
    const photo = form.get("photo");
    const password = form.get("password");

    
    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      setError(passwordErrors);
      return;
    }

   
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Registration Successful!");
        updateProfileUser({ displayName: name, photoURL: photo })
          .then(() => {
            // console.log("Profile updated successfully");
          })
          .catch((err) => {
            console.error("Error updating profile:", err);
          });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.error("Registration failed:", errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Google Login Successful!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Login Failed:", error.message);
        toast.error("Google Login Failed. Please try again.");
      });
  };

  return (
   <div>
    <header>
      <Navbar></Navbar>
    </header>
     <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex justify-center items-center">
        <div data-aos="fade-right" className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10 shadow-xl">
          <h2 className="text-2xl font-semibold text-center mt-5">
            Register Your Account
          </h2>
          <form onSubmit={handleSubmit} className="card-body">
           
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>

            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="photo-url"
                className="input input-bordered"
                required
              />
            </div>

            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

           
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="password"
                className="input input-bordered"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-10"
              >
                {showPassword ? (
                  <AiFillEye className="text-gray-500 w-6 h-6" />
                ) : (
                  <AiFillEyeInvisible className="text-gray-500 w-6 h-6" />
                )}
              </button>
             
              {(error.uppercase || error.lowercase || error.length) && (
                <p className="text-xs text-red-500 mt-2">
                  {error.uppercase || error.lowercase
                    ? "Password must have at least one uppercase letter and one lowercase letter."
                    : ""}
                  {error.length && " Password must be at least 6 characters long."}
                </p>
              )}
            </div>

           
            <div className="form-control mt-6">
              <button className="btn btn-neutral rounded-none">Register</button>
            </div>
          </form>
          <p className="text-center font-semibold">
            Already Have An Account?{" "}
            <Link className="text-red-500" to="/auth/login">
              Login
            </Link>
          </p>
          
          <div className="divider">OR</div>
          <div className="form-control">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-primary flex items-center justify-center gap-2"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <Footer></Footer>
    </footer>
   </div>
  );
};

export default Register;