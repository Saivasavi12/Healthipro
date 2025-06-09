import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getJournalEntry } from '../../services/journal.service';
import ReactQuill from 'react-quill';

function ViewJournalEntry() {
    const {id} = useParams();
    const [content, setContent] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        getJournalEntry(token, id).then(res => {
            setContent(res.content)
        })
    })
  return (
    <Box style={{ padding: '60px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '50px', width: '70%'
    }}>
     <h2>Journal Writing</h2>
   <ReactQuill
     value={content}
     readOnly
     placeholder="Start writing your journal..."
   />   
 </Box>
  )
}

export default ViewJournalEntry
