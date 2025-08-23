import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster 
				position="top-center"
				toastOptions={{
					duration: 4000,
					style: {
						background: 'rgba(255, 255, 255, 0.1)',
						backdropFilter: 'blur(10px)',
						color: '#fff',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '12px',
					},
				}}
			/>
		</div>
	);
}

export default App;
