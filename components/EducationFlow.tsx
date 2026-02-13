import * as React from 'react';
import {
  PlayRegular,
  CubeRegular,
  SettingsRegular,
  ArrowRepeatAllRegular,
  GlobeRegular,
  CloudRegular,
  MoreHorizontalRegular,
  ArrowDownRegular
} from '@fluentui/react-icons';
import { useTheme } from '@/ThemeContext';

interface FlowStepProps {
  icon: React.ElementType;
  title: string;
  color: string;
  bgColor: string;
  isLast?: boolean;
}

const FlowStep: React.FC<FlowStepProps> = ({ icon: Icon, title, color, bgColor, isLast }) => {
  const { mode } = useTheme();

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <div
        className={`group relative flex items-center w-full h-14 rounded shadow-sm border transition-all hover:shadow-md cursor-pointer ${mode === 'dark' ? 'bg-[#252423] border-[#484644]' : 'bg-white border-[#d2d0ce]'
          }`}
        style={{ backgroundColor: mode === 'dark' ? '#252423' : bgColor }}
      >
        {/* Left Icon Box (Solid Color) */}
        <div
          className="flex items-center justify-center w-14 h-full rounded-l"
          style={{ backgroundColor: color }}
        >
          <Icon fontSize={24} className="text-white" />
        </div>

        {/* Content Area */}
        <div className="flex-1 px-4 overflow-hidden">
          <p className={`text-[14px] font-medium truncate ${mode === 'dark' ? 'text-white' : 'text-[#323130]'
            }`}>
            {title}
          </p>
        </div>

        {/* Action Menu (Visible on Hover/Static) */}
        <div className="px-4 text-[#605e5c]">
          <MoreHorizontalRegular fontSize={20} />
        </div>
      </div>

      {!isLast && (
        <div className="py-2 flex justify-center">
          <ArrowDownRegular fontSize={32} className={mode === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
        </div>
      )}
    </div>
  );
};

const EducationFlow: React.FC<any> = () => {
  const { mode } = useTheme();

  const flowSteps = [
    {
      icon: PlayRegular,
      color: '#0078d4',
      bgColor: '#f0f6ff',
      title: 'Manually trigger a flow'
    },
    {
      icon: CubeRegular,
      color: '#484a7d',
      bgColor: '#f3f2f9',
      title: 'Call ExportToPackage API in D365'
    },
    {
      icon: SettingsRegular,
      color: '#760d9a',
      bgColor: '#f9f0ff',
      title: 'Initialize ExecutionStatus variable to track API call status'
    },
    {
      icon: ArrowRepeatAllRegular,
      color: '#605e5c',
      bgColor: '#f3f2f1',
      title: 'Do until Status is Success'
    },
    {
      icon: CubeRegular,
      color: '#484a7d',
      bgColor: '#f3f2f9',
      title: 'Retrieve ExportToPackage call status'
    },
    {
      icon: CubeRegular,
      color: '#484a7d',
      bgColor: '#f3f2f9',
      title: 'Retrieve Package URL'
    },
    {
      icon: GlobeRegular,
      color: '#4b820d',
      bgColor: '#f4f9f0',
      title: 'Retrieve Package file based on Package URL'
    },
    {
      icon: CloudRegular,
      color: '#0078d4',
      bgColor: '#f0f6ff',
      title: 'Store the Package file on OneDrive'
    },
  ];

  return (
    <div className={`w-full h-full min-h-screen py-10 px-6 overflow-auto ${mode === 'dark' ? 'bg-[#111]' : 'bg-[#f8f9fa]'
      }`}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-left border-b pb-4 border-gray-200 dark:border-gray-800">
          <h1 className={`text-2xl font-bold flex items-center gap-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            <span className="p-1.5 bg-[#0078d4] rounded-sm flex items-center justify-center">
              <CloudRegular fontSize={20} className="text-white" />
            </span>
            Package Deployment Flow
          </h1>
          <p className={`mt-1 text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Automated workflow for exporting and storing D365 packages
          </p>
        </div>

        <div className="flex flex-col space-y-0 pb-20">
          {flowSteps.map((step, index) => (
            <FlowStep
              key={index}
              {...step}
              isLast={index === flowSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationFlow;
