import * as React from 'react';
import { Card } from '../components/UIComponents';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-gradient-to-br from-[#f8f0fc] via-[#fff] to-[#f0f2f5] p-8">
      
      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-semibold">Try new experience</span>
                <span>Dynamics 365 Developer Profile</span>
            </div>
            <h1 className="text-4xl font-semibold text-[#323130] mb-2">Welcome To Shivam's Portfolio!</h1>
        </div>

        {/* Main Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Card 1: Projects */}
            <div 
                onClick={() => navigate('/projects')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-64 justify-between"
            >
                <div className="flex justify-center items-center h-32 bg-gradient-to-b from-purple-50 to-white rounded-lg mb-4">
                    <span className="material-icons text-5xl text-purple-600">rocket_launch</span>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 text-lg">My Projects</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Explore CRM solutions, plugins, and migrations built with .NET and Dataverse.
                    </p>
                </div>
            </div>

            {/* Card 2: Experience */}
            <div 
                onClick={() => navigate('/experience')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-64 justify-between"
            >
                <div className="flex justify-center items-center h-32 bg-gradient-to-b from-blue-50 to-white rounded-lg mb-4">
                     <span className="material-icons text-5xl text-blue-600">business_center</span>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 text-lg">Work Experience</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Dynamics 365 development history, Dataverse operations, and backend integrations.
                    </p>
                </div>
            </div>

            {/* Card 3: Contact/Resume */}
            <div 
                onClick={() => navigate('/about')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-64 justify-between"
            >
                <div className="flex justify-center items-center h-32 bg-gradient-to-b from-green-50 to-white rounded-lg mb-4">
                     <span className="material-icons text-5xl text-green-600">person_search</span>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 text-lg">About Me</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Software Developer specializing in Microsoft Dynamics 365, Plugins, and Automation.
                    </p>
                </div>
            </div>

        </div>

        {/* Bottom Section - "Plans" style */}
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Specialization</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-center min-h-[200px]">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <span className="material-icons text-3xl">code</span>
                </div>
                <h3 className="font-semibold text-gray-700">Dynamics 365 & Automation</h3>
                <p className="text-gray-500 text-sm max-w-md mt-2">
                    Building reliable systems with Dataverse, C#, Power Automate, and custom .NET integrations.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
