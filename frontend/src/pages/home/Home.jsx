import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex items-center justify-center min-h-screen p-4'>
			<div className='flex w-full max-w-7xl h-[90vh] rounded-2xl overflow-hidden shadow-2xl'>
				<div className='w-80 flex-shrink-0 h-full'>
					<Sidebar />
				</div>
				<div className='flex-1 h-full'>
					<MessageContainer />
				</div>
			</div>
		</div>
	);
};
export default Home;
