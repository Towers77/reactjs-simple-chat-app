import Button from '../components/Button';
import Header from '../components/Header';

const Home = () => {
	return (
		<div>
			<Header />
			<div className="m-4">
				<Button
					text="Like!"
					textColor="text-almond"
					bgColor="bg-navy"
					handleClick={() => console.log('click')}
				/>
			</div>
		</div>
	);
};

export default Home;
