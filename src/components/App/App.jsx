import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Note from '../Note/Note';
import CreateArea from '../CreateArea/CreateArea';
import api from '../API/Notes'

function App() {
	const [notes, setNotes] = useState([]);

	useEffect(() => {
		const fetchNotes = async () => {
			try {
				const response = await api.get('/notes');
				setNotes(response.data)
			} catch (err) {
				console.log(err.response.data);
				console.log(err.response.header);
				console.log(err.response.status);
			}
		}

		fetchNotes()
	}, [])

	const addNote = async (newNote) => {
		try{
			const response = await api.post('/notes', newNote)
			setNotes((prevNotes) => {
				return [...prevNotes, response.data];
			});
		} catch (err) {
			console.error(`Error: ${err.message}`)
		}
	}

	async function deleteNote(id) {
		let idArray = [];

		try {
			const response = await api.get('/notes');
			idArray = response.data.map((note) => note.id);
		} catch (err) {
			console.error(`Error: ${err.message}`)
		}

		try {
			await api.delete(`/notes/${idArray[id]}`);
			setNotes((prevNotes) => {
				return prevNotes.filter((noteItem, index) => {
					return index !== id;
				});
			});
		} catch (err) {
			console.error(`Error: ${err.message}`)
		}
	}

	return (
		<div>
			<Header />
			<CreateArea onAdd={addNote} />
			{notes.map((noteItem, index) => {				
				return (
					<Note
						key={index}
						id={index}
						title={noteItem.title}
						content={noteItem.content}
						onDelete={deleteNote}
					/>
				);
			})}
			<Footer />
		</div>
	);
}

export default App;
