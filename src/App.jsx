import { Button } from './components/ui/button';

function App() {
	return (
		<>
			<h1 className=''>Hello</h1>
			<Button onClick={() => console.log('hello')} variant='' size='sm'>
				Hello
			</Button>
		</>
	);
}

export default App;
