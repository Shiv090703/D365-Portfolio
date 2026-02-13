import React, { useState } from 'react';
import { Card } from '../components/UIComponents';
import ContactDrawer from '../components/ContactDrawer';

const About: React.FC = () => {
  const [isContactOpen, setContactOpen] = useState(false);

  const skills = {
    "Dynamics 365": ["Plugins", "Dataverse", "Workflows", "Security Roles", "Business Rules", "Field Dependencies"],
    "Backend": ["C#", ".NET Core", "Web API", "SQL Server", "Azure Functions"],
    "Automation": ["Power Automate", "Logic Apps", "Cloud Flows", "BPM"],
    "Frontend": ["JavaScript", "TypeScript", "HTML/CSS", "React (Basic)"]
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      
      {/* Hero Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg shrink-0 overflow-hidden border-4 border-white aspect-square">
            <img 
                src="/assets/profile.jpeg" 
                alt="Shivam Profile" 
                className="w-full h-full object-cover object-center"
            />
        </div>
        <div>
            <div className="flex items-center gap-2 mb-2">
                 <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">AVAILABLE FOR HIRE</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shivam</h1>
            <h2 className="text-xl text-gray-600 font-medium">Software Developer | Dynamics 365 Developer (.NET)</h2>
            <p className="mt-4 text-gray-500 max-w-2xl leading-relaxed">
                Software Developer specializing in Microsoft Dynamics 365 (Dataverse/CRM) and .NET development. 
                Experienced in CRM customization, plugins, migrations, automation, and building scalable business solutions.
            </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
              <Card title="About Me">
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                        I’m a Software Developer with a strong focus on Microsoft Dynamics 365 (Dataverse/CRM) and modern application development. 
                        I enjoy building clean, scalable solutions that solve real business problems—especially using C#, .NET, Plugins, JavaScript, Power Automate, and Dataverse customization.
                    </p>
                    <p>
                        I’ve worked on CRM migrations, automation workflows, plugin development, and dependency-based configurations in Dynamics 365. 
                        I focus on writing structured, maintainable code and delivering reliable systems that support business growth. 
                        I’m passionate about improving performance, reducing manual work, and building systems that teams can trust long-term.
                    </p>
                  </div>
              </Card>

              <Card title="What I Do">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="material-icons text-blue-600">extension</span>
                              <h3 className="font-semibold text-gray-800">Dynamics 365 CRM Dev</h3>
                          </div>
                          <p className="text-sm text-gray-600">Plugins, automation, workflows, custom logic, and Dataverse development.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="material-icons text-green-600">sync_alt</span>
                              <h3 className="font-semibold text-gray-800">CRM Migration</h3>
                          </div>
                          <p className="text-sm text-gray-600">Account migrations, sector/sub-sector dependencies, strategy mapping, and validation.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="material-icons text-purple-600">precision_manufacturing</span>
                              <h3 className="font-semibold text-gray-800">Process Automation</h3>
                          </div>
                          <p className="text-sm text-gray-600">Power Automate + clean system logic to reduce manual work and improve accuracy.</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                              <span className="material-icons text-orange-600">code</span>
                              <h3 className="font-semibold text-gray-800">.NET & Backend</h3>
                          </div>
                          <p className="text-sm text-gray-600">C# development, Web APIs, and integrations ensuring robust backend performance.</p>
                      </div>
                  </div>
              </Card>
          </div>

          <div className="space-y-6">
              <Card title="Technical Skills">
                  <div className="space-y-4">
                      {Object.entries(skills).map(([category, items]) => (
                          <div key={category}>
                              <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">{category}</h4>
                              <div className="flex flex-wrap gap-2">
                                  {items.map(skill => (
                                      <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm border border-gray-200">
                                          {skill}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      ))}
                  </div>
              </Card>

              <Card title="Contact">
                   <p className="text-gray-600 text-sm mb-4">
                       Let’s connect and discuss how I can help build or improve your Dynamics 365 solutions.
                   </p>
                   <button 
                       onClick={() => setContactOpen(true)}
                       className="w-full bg-[#0078d4] text-white py-2 rounded font-medium hover:bg-[#106ebe] transition-colors mb-3"
                   >
                       Contact Me
                   </button>
                   <button 
                     onClick={() => {
                       const link = document.createElement('a');
                       link.href = '/assets/Shivam-Rana.pdf';
                       link.download = 'Shivam-Rana.pdf';
                       link.click();
                     }}
                     className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
                   >
                     <span className="material-icons text-lg">download</span>
                     Export Resume
                   </button>
              </Card>
          </div>
      </div>
      
      {/* Contact Drawer Component */}
      <ContactDrawer isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default About;