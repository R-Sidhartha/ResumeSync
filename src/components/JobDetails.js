import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import Navbar from "./Navbar";

const JobDetails = ({ resumeData }) => {
  const [jobDetails, setJobDetails] = useState(null);
  const [courses, setCourses] = useState(null);
  const { job } = useLocation().state;
  useEffect(() => {
    const fetchjobdetails = async (jobId) => {
      try {
        const response1 = await fetch(
          `https://freight-service.azurewebsites.net/api/getjobposting?id=${jobId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              data: JSON.stringify(jobId),
            },
          }
        );
        const jobdata = await response1.json();
        setJobDetails(jobdata);

        try {
          const response2 = await fetch(
            "http://34.224.93.99:5000/courses-matcher/",
            {
              method: "POST",
              body: JSON.stringify({
                resume: resumeData,
                job: jobdata.jobDetails,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Check if the request was successful (status code 200)
          if (response2.ok) {
            const data = await response2.json();
            setCourses(data.courses);
          } else {
            // Handle non-successful responses
            console.error("Error:", response2.status, response2.statusText);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetchjobdetails(job.job_id);
  }, [job.job_id, resumeData]);

  if (!jobDetails) {
    return (
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <div className="w-full">
          <Navbar />
        </div>
        <h1 className="text-2xl font-bold mb-4 mt-6">Job Details</h1>
        <p className="text-gray-600">Please Wait..., Fetching job details</p>
        <div className="animate-spin loader text-3xl text-orange-400 ">
          <LuLoader2 />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="w-full flex justify-center flex-col items-center gap-5">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="w-full md:w-4/5 flex justify-center items-center flex-col bg-white rounded-2xl py-2 px-8">
          <h1 className="text-2xl font-bold mb-8 mt-2 text-gray-800">
            Job Details
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row-reverse justify-between items-center">
              <div className="bg-yellow-400 flex w-[72px] h-[70px] hover:opacity-60 text-white p-2 rounded-full items-center justify-center cursor-pointer">
                <div className="rounded-[50%] w-[60px] h-[60px] bg-white flex items-center justify-center">
                  <div className="rounded-full p-2 bg-yellow-400 h-10 w-10 flex justify-center items-center text-2xl">
                    {job.match_score}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <h1 className="lg:text-lg font-semibold text-gray-800">
                    Name:{" "}
                  </h1>
                  <span className="text-sm lg:text-base mx-1 pt-[2px] md:pt-[1px] text-gray-700">
                    {" "}
                    {jobDetails?.neomDivision}
                  </span>
                </div>
                <div className="flex items-center">
                  <h1 className="lg:text-lg font-semibold text-gray-800">
                    Job Title:{" "}
                  </h1>
                  <span className="text-sm lg:text-base mx-1 pt-[2px] md:pt-[1px] text-gray-700">
                    {" "}
                    {jobDetails?.jobTitle}
                  </span>
                </div>
                <div className="flex items-center">
                  <h1 className="lg:text-lg font-semibold text-gray-800">
                    Job Type:{" "}
                  </h1>
                  <span className="text-sm lg:text-base mx-1 pt-[2px] md:pt-[1px] text-gray-700">
                    {" "}
                    {jobDetails?.jobType}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h1 className="lg:text-lg font-semibold text-gray-800">
                Job Description:
              </h1>
              <p className="mb-4 text-sm lg:text-base text-justify text-gray-700">
                {jobDetails?.jobDetails}
              </p>
            </div>
            <div className="flex justify-center ">
              <button
                type="button"
                className="mt-10 mb-10 bg-blue-300 p-2 rounded-xl py-2 px-5 w-3/4 md:w-1/3 hover:opacity-70 lg:text-lg font-semibold text-gray-800"
              >
                Apply now
              </button>
            </div>
          </div>
          <div>
            {/* Related Courses */}
            <h2 className="font-bold mb-8 text-xl w-full text-center mt-12 text-gray-800">
              Suggested courses to upskill
            </h2>
            {!courses ? (
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <p className=" text-gray-600">
                  Please wait....Talent Academy AI is finding skills gaps and
                  courses to upskill
                </p>
                <div className="animate-spin loader text-3xl text-orange-400 ">
                  <LuLoader2 />
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center ">
                <div className="courses mx-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-8">
                  {courses?.map((course, index) => (
                    <div
                      className="max-w-[15rem] flex flex-col gap-8 p-2 bg-gray-100 border border-gray-200 cursor-pointer md:p-8 rounded-2xl items-center"
                      key={index}
                    >
                      <div className="w-full h-full overflow-hidden rounded-lg"
                      >
                        <img
                          src={course.course_image}
                          alt="img"
                          className="w-full h-full rounded-xl"
                        />
                      </div>
                      <a
                        href={course.course_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="mb-2 text-[15px] text-center font-semibold tracking-tight text-gray-600 relative md:text-base">
                          {course.course_title}
                        </p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
