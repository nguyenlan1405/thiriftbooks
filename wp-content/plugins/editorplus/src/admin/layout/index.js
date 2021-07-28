import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../components/layout/header';

function Layout({ children }) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}

export default withRouter( Layout );
