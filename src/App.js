import React, { useState } from "react";
import RelatedJobs from "./components/RelatedJobs";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobDetails from "./components/JobDetails";

const App = () => {
  const [resumeData, setResumeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [jobloading, setjobLoading] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [ResumeName, setResumeName] = useState("");
  const [showResumeData, setShowResumeData] = useState(false);
  const [file, setFile] = useState(null);
  const handleUpload = async (file) => {
    setLoading(true);
    setShowResumeData(true);
    const formData = new FormData();
    formData.append("resume", file);
    const apiUrl = "http://34.224.93.99:5000/resume-analyzer/";
    const response = await fetch(`${apiUrl}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setResumeData(data);
    setLoading(false);

    //Matching Jobs api call
    const jobsApiUrl = "http://34.224.93.99:5000/jobs-matcher/";
    setjobLoading(true);
    try {
      const jobsResponse = await fetch(jobsApiUrl, {
        method: "POST",
        body: JSON.stringify({ resume: data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!jobsResponse.ok) {
        throw new Error(`HTTP error! Status: ${jobsResponse.status}`);
      }
      const jobsData = await jobsResponse.json();
      setRelatedJobs(jobsData.jobs);
      setjobLoading(false);
    } catch (error) {
      console.error("Error during jobs API call:", error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen overflow-hidden">
      <Router>
        <Routes>
            <Route
              index
              element={
                <Home
                  setFile={setFile}
                  file={file}
                  onUpload={handleUpload}
                  setResumeName={setResumeName}
                  setShowResumeData={setShowResumeData}
                  resumeData={resumeData}
                  loading={loading}
                  ResumeName={ResumeName}
                  showResumeData={showResumeData}
                />
              }
            />
            {file && (
              <Route
                path="relatedjobs"
                element={
                  <RelatedJobs jobs={relatedJobs} jobloading={jobloading} />
                }
              />
            )}
          <Route
            path="jobdetails/:jobid"
            element={<JobDetails resumeData={resumeData} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
