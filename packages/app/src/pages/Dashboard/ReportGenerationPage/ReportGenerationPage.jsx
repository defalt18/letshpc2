import React from 'react';
import Chip from '@material-ui/core/Chip';
import Report from './components/Report/Report';

function ReportGenerationPage({ user }) {
  const [doc, setDoc] = React.useState(false);
  return (
    <div className="page">
      <h1>Welcome to Report Generation page</h1>
      <div className="tutorial__list">
        <div className="Report_Boxes">
          <h2>Evaluation Status</h2>
          <Chip
            label="Pending"
            size="small"
            style={{
              color: 'yellow',
              borderColor: 'yellow',
              background: 'rgba(255,255,0,0.1)',
            }}
            variant="outlined"
          />
        </div>
        <div className="Report_Boxes box_report" onClick={() => setDoc(true)}>
          <h2>Go to Report</h2>
          <Chip
            label="Pending"
            size="small"
            style={{
              color: 'yellow',
              borderColor: 'yellow',
              background: 'rgba(255,255,0,0.1)',
            }}
            variant="outlined"
          />
        </div>
      </div>
      {doc && <Report func={setDoc} user={user} />}
    </div>
  );
}

export default ReportGenerationPage;
