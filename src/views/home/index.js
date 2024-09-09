import React from 'react';
import {Container, Card} from 'reactstrap';

function Index() {
	return (
		<Container>
			<Card className='mt-5 p-5'>
				<h1 className='display-4'>&#123;your name&#125;</h1>
				<address>
					<a href='mailto:email@address.com'>email@address.com</a>
					<br />
					<a href='tel:+635552368'>(+63) 123-1234-1234</a>
				</address>
			</Card>
		</Container>
	);
}

export default Index;
