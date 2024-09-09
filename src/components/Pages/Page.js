import React from 'react';
import styles from './Page.module.scss';
import PageFooter from './PageFooter';
import PageMain from './PageMain';
import PageNav from './PageNav';

function Page(props) {
	const {children} = props;

	return (
		<div className={styles['page']}>
			<PageNav />
			<PageMain>{children}</PageMain>
			<PageFooter />
		</div>
	);
}

export default Page;
