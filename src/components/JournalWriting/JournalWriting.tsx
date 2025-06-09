import { Box, Button, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createJournalEntry, getAllJournalEntries } from '../../services/journal.service';
import { width } from '@mui/system';
import { useNavigate } from 'react-router-dom';

function JournalWriting() {
  const [content, setContent] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [getList, setGetList] = useState(false);
  const router = useNavigate();

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
   getAllJournalEntries(token).then(res => {
      setJournalEntries(res.journalEntries)
    })

  }, [getList])

  const saveJournal = async () => {
    const token = localStorage.getItem('token');
    await createJournalEntry(content, token).then((res) => {
      console.log("journal response", res)
      setGetList(!getList);
      setContent('')
    });

   
  }

  const openJournalEntry = (id: any) => {
    router(`/journal-entry/${id}`)
  }

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: '600px',
      backgroundImage: 'url(book3.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      marginTop: '60px',
      color: 'white',
    }}>
      <h2>Journal Writing</h2>
    <Box sx={{display: 'flex', padding: '20px', borderRadius: '8px'}}>
      <Box style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '8px', width: '70%'
       }}>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        placeholder="Start writing your journal..."
        style={{ height: '200px', color: 'white' }}
      />
      <Button onClick={saveJournal}>Save Journal</Button>
      
    </Box>
    <Box sx={{textAlign: 'center', width: '20%'}}>
     <Typography variant='h6'>
     Your Entries
     </Typography>
     {journalEntries.map((journalEntry: any) => {
  const formattedDate = new Date(journalEntry.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <>
    <Link
  component="button"
  variant="body2"
  key={journalEntry._id}
  onClick={() => {openJournalEntry(journalEntry._id)}}
>
  {formattedDate}
</Link>
    <br />
    </>
  );
})}
    </Box>
    </Box>
    </Box>
  );
}

export default JournalWriting;
