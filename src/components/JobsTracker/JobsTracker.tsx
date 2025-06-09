import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Checkbox, FormControlLabel } from '@mui/material';

// Function to copy the entire table data to clipboard
const copyAllToClipboard = (jobs: any) => {
  const tableData = jobs
    .map((job: any) => `Role: ${job.role}\nCompany: ${job.company}\nURL: ${job.url}\nDate Applied: ${job.dateApplied}\nEasy Apply: ${job.easyApply ? 'Yes' : 'No'}\nReferral: ${job.referral ? 'Yes' : 'No'}\nReferral Person: ${job.referralPerson || 'N/A'}\n\n`)
    .join('');
  
  navigator.clipboard.writeText(tableData).then(
    () => {
      alert('All job details copied to clipboard!');
    },
    (err) => {
      console.log('Failed to copy: ', err);
    }
  );
};

const JobTracker = () => {
  const [jobs, setJobs] = useState<any>([]);
  const [jobRole, setJobRole] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [company, setCompany] = useState('');
  const [easyApply, setEasyApply] = useState(false);
  const [referral, setReferral] = useState(false);
  const [referralPerson, setReferralPerson] = useState('');

  // Add job with current date
  const addJob = () => {
    if (jobRole && jobUrl && company) {
      const currentDate = new Date().toLocaleDateString();
      setJobs([
        ...jobs,
        { 
          role: jobRole, 
          company,
          url: jobUrl, 
          dateApplied: currentDate,
          easyApply,
          referral,
          referralPerson: referral ? referralPerson : ''
        }
      ]);
      setJobRole('');
      setCompany('');
      setJobUrl('');
      setEasyApply(false);
      setReferral(false);
      setReferralPerson('');
    } else {
      alert('Please fill in the job role, company, and URL');
    }
  };

  // Delete a job from the list
  const deleteJob = (index: number) => {
    const updatedJobs = jobs.filter((_: any, jobIndex: any) => jobIndex !== index);
    setJobs(updatedJobs);
  };

  return (
    <Box sx={{ maxWidth: '100%', marginTop: 4, padding: 2, backgroundColor: '#f0f0f0' }}>
      <h2>Job Tracker</h2>
      
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Job Role"
          variant="outlined"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          sx={{ marginRight: 2, width: '45%' }}
        />
        <TextField
          label="Job URL"
          variant="outlined"
          value={jobUrl}
          onChange={(e) => setJobUrl(e.target.value)}
          sx={{ marginLeft: 2, width: '45%' }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Company"
          variant="outlined"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          sx={{ marginRight: 2, width: '45%' }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={easyApply}
              onChange={(e) => setEasyApply(e.target.checked)}
              color="primary"
            />
          }
          label="Easy Apply"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={referral}
              onChange={(e) => setReferral(e.target.checked)}
              color="primary"
            />
          }
          label="Referral"
        />
      </Box>

      <TextField
        label="Referral Person"
        variant="outlined"
        value={referralPerson}
        onChange={(e) => setReferralPerson(e.target.value)}
        sx={{ marginBottom: 2 }}
        disabled={!referral}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={addJob}
        sx={{ width: '100%', marginBottom: 2 }}
      >
        Add Job
      </Button>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => copyAllToClipboard(jobs)}
        sx={{ marginBottom: 2 }}
      >
        Copy All Jobs
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="job table">
          <TableHead>
            <TableRow>
              <TableCell>Job Role</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Date Applied</TableCell>
              <TableCell>Easy Apply</TableCell>
              <TableCell>Referral</TableCell>
              <TableCell>Referral Person</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{job.role}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.url}</TableCell>
                <TableCell>{job.dateApplied}</TableCell>
                <TableCell>{job.easyApply ? 'Yes' : 'No'}</TableCell>
                <TableCell>{job.referral ? 'Yes' : 'No'}</TableCell>
                <TableCell>{job.referralPerson || 'N/A'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteJob(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default JobTracker;
