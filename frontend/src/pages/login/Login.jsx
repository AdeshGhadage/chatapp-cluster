import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4'>
			<div className='w-full max-w-md md:min-w-[450px] flex flex-col p-8 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20'>
				{/* Header */}
				<div className='text-center mb-8'>
					<div className='mb-4'>
						<div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
							<svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
							</svg>
						</div>
					</div>
					<h1 className='text-4xl font-bold text-white mb-2'>
						Welcome Back to <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>ChatCluster</span>
					</h1>
					<p className='text-gray-300 text-lg'>Sign in to continue your conversations</p>
				</div>

				<form onSubmit={handleSubmit} className='space-y-6'>
					{/* Username Field */}
					<div className='space-y-2'>
						<label className='text-white font-medium flex items-center gap-2'>
							<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207' />
							</svg>
							Username
						</label>
						<input
							type='text'
							placeholder='Enter your username'
							className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/10'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>

					{/* Password Field */}
					<div className='space-y-2'>
						<label className='text-white font-medium flex items-center gap-2'>
							<svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
							</svg>
							Password
						</label>
						<input
							type='password'
							placeholder='Enter your password'
							className='w-full px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white/10'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					{/* Login Button */}
					<div className='pt-4'>
						<button 
							className='w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none' 
							disabled={loading}
						>
							{loading ? (
								<div className='flex items-center justify-center gap-2'>
									<svg className='animate-spin h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
										<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
										<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
									</svg>
									Signing In...
								</div>
							) : (
								<div className='flex items-center justify-center gap-2'>
									<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
									</svg>
									Sign In
								</div>
							)}
						</button>
					</div>

					{/* Sign Up Link */}
					<div className='text-center pt-4'>
						<p className='text-gray-300'>
							Don't have an account?{' '}
							<Link
								to='/signup'
								className='text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline'
							>
								Sign up here
							</Link>
						</p>
					</div>
				</form>

				{/* Footer */}
				<div className='text-center mt-8 pt-6 border-t border-white/10'>
					<p className='text-gray-400 text-sm'>
						Secure login with end-to-end encryption
					</p>
				</div>
			</div>
		</div>
	);
};
export default Login;