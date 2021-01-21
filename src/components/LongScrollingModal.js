import React, { useState } from "react";

import { Button, Modal } from "reactstrap";

const LongScrollingModal = ({
	children,
	title,
	buttonText,
	buttonClassName,
}) => {
	const [scrollingLongContent, setScrollingLongContent] = useState(false);
	return (
		<>
			<Button
				className={buttonClassName}
				onClick={() => setScrollingLongContent(true)}
			>
				{buttonText}
			</Button>

			<Modal
				isOpen={scrollingLongContent}
				toggle={() => setScrollingLongContent(false)}
			>
				<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLongTitle">
						{title}
					</h5>
					<button
						aria-label="Close"
						className="close"
						data-dismiss="modal"
						type="button"
						onClick={() => setScrollingLongContent(false)}
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">{children}</div>
			</Modal>
		</>
	);
};

export default LongScrollingModal;
