import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import './CreateArea.css';

function CreateArea(props) {
	const [isExpanded, setExpanded] = useState(false);

	const [note, setNote] = useState({
		title: '',
		content: '',
	});

	function handleClick(event) {
		setExpanded(true);
	}

	function handleChange(event) {
		const { name, value } = event.target;

		setNote((prevNote) => ({...prevNote,[name]: value,}));}

	function submitNote(event) {
		props.onAdd(note);
		setNote({
			title: '',
			content: '',
		});
		event.preventDefault();
	}

	return (
		<div>
			<form>
				{isExpanded && (
					<input
						name='title'
						onChange={handleChange}
						value={note.title}
						placeholder='Note Title'
					/>
				)}
				<textarea
					name='content'
					onClick={handleClick}
					onChange={handleChange}
					value={note.content}
					placeholder={isExpanded ? 'Note content' : 'Take a note...'}
					rows={isExpanded ? '3' : '1'}
				/>
				<Zoom in={isExpanded}>
					<Fab className='button' size='small' onClick={submitNote}>
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;
