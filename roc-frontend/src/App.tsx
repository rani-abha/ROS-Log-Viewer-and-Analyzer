import { useState,useEffect } from 'react'
import { AppProvider, useAppContext } from './services/context/context';
import { fetchLogs, fetchSeverities } from './services/context/reducer';

import './App.css'
import EnhancedTable from './screens/table'
import { APIService } from './services/logApi';

function Root() {
  const [count, setCount] = useState(0)
  const { state, dispatch } = useAppContext();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchLogs(dispatch);
    fetchSeverities(dispatch);
}, [dispatch]);
console.log(state)

const handle1 = async()=>{
  fetchLogs(dispatch);
}

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        setFile(event.target.files[0]);
    }
};

const handleFileUpload = async () => {
    if (file) {
        try {
            await APIService.uploadFile(file);
            alert('File uploaded successfully');
        } catch (error) {
            alert('Failed to upload file');
        }
    }
};

  return (
    <>
 <h1>Logs</h1>
            {state.loading && <p>Loading...</p>}
            {state.error && <p>Error: {state.error}</p>}
          
            
            <ul>
                {/* {state.severities.map((severity, index) => (
                    <li key={index}>{severity}</li>
                ))} */}
                
            </ul>
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            <button onClick={handle1}>fetch</button>
      <EnhancedTable/>
    </>
  )
}

const App: React.FC = () => (
  <AppProvider>
      <Root />
  </AppProvider>
);
export default App
