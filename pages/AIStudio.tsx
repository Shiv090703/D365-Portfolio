import React, { useState, useRef } from 'react';
import { Button, Card, Input, Select } from '../components/UIComponents';
import { editImage, generateVideo } from '../services/geminiService';

const AIStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-light text-gray-800">Marketing Creative Studio</h1>
        <p className="text-gray-500">Generate and edit marketing assets using Gemini & Veo AI models.</p>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('image')}
            className={`pb-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'image' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
              <span className="flex items-center gap-2"><span className="material-icons">image_edit_auto</span> Image Editor</span>
          </button>
          <button 
             onClick={() => setActiveTab('video')}
             className={`pb-3 px-4 font-medium transition-colors border-b-2 ${activeTab === 'video' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
          >
              <span className="flex items-center gap-2"><span className="material-icons">movie_filter</span> Video Generator</span>
          </button>
      </div>

      {activeTab === 'image' ? <ImageEditor /> : <VideoGenerator />}
    </div>
  );
};

const ImageEditor: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleEdit = async () => {
        if (!image || !prompt) return;
        setLoading(true);
        try {
            // Remove data url prefix for API
            const base64Data = image.split(',')[1];
            const mimeType = image.split(';')[0].split(':')[1];
            
            const result = await editImage(base64Data, prompt, mimeType);
            setImage(result);
        } catch (e) {
            alert('Failed to edit image: ' + (e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
            <Card className="col-span-2 h-full flex flex-col items-center justify-center bg-gray-100 relative overflow-hidden">
                {!image ? (
                    <div className="text-center">
                        <span className="material-icons text-6xl text-gray-300">add_photo_alternate</span>
                        <p className="text-gray-500 mt-2">Upload an image to start</p>
                        <Button className="mt-4" onClick={() => fileInputRef.current?.click()}>Upload</Button>
                    </div>
                ) : (
                    <img src={image} alt="Preview" className="max-w-full max-h-full object-contain" />
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                {loading && (
                    <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 font-semibold text-blue-800">Gemini is editing your image...</p>
                    </div>
                )}
            </Card>

            <div className="flex flex-col gap-4">
                <Card title="Controls" className="flex-1">
                    <p className="text-sm text-gray-500 mb-4">
                        Use Gemini 2.5 Flash to edit your image. Describe the changes you want (e.g., "Add a retro filter", "Remove background").
                    </p>
                    <Input 
                        label="Edit Prompt" 
                        placeholder="e.g. Add fireworks in the sky" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={!image}
                    />
                    <div className="mt-6 flex flex-col gap-2">
                        <Button onClick={handleEdit} disabled={!image || !prompt || loading} className="w-full justify-center">
                             <span className="material-icons mr-2">auto_fix_high</span> Generate Edit
                        </Button>
                        <Button variant="secondary" onClick={() => { setImage(null); setPrompt(''); }} className="w-full justify-center">
                            Clear
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

const VideoGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [loading, setLoading] = useState(false);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleGenerate = async () => {
        if (!prompt && !image) return;
        setLoading(true);
        setVideoUrl(null);
        try {
            const base64Data = image ? image.split(',')[1] : undefined;
            const url = await generateVideo(prompt, base64Data, aspectRatio);
            setVideoUrl(url);
        } catch (e) {
            alert('Failed to generate video: ' + (e as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
                 <Card title="Video Configuration">
                     <div className="space-y-4">
                         <div className="space-y-2">
                             <label className="text-sm font-semibold text-gray-700">Source Image (Optional)</label>
                             <div 
                                className="border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => fileInputRef.current?.click()}
                             >
                                 {image ? (
                                     <div className="relative h-32 flex items-center justify-center">
                                         <img src={image} className="max-h-full" alt="Source" />
                                         <button onClick={(e) => { e.stopPropagation(); setImage(null); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><span className="material-icons text-xs">close</span></button>
                                     </div>
                                 ) : (
                                     <div className="text-gray-400">
                                         <span className="material-icons">add_a_photo</span>
                                         <p className="text-xs">Click to upload reference image</p>
                                     </div>
                                 )}
                                 <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                             </div>
                         </div>

                         <Input 
                            label="Video Prompt" 
                            placeholder="Describe the video... (e.g. A neon hologram of a cat)"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                         />

                         <Select label="Aspect Ratio" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as any)}>
                             <option value="16:9">Landscape (16:9)</option>
                             <option value="9:16">Portrait (9:16)</option>
                         </Select>

                         <div className="pt-4">
                             <Button onClick={handleGenerate} disabled={loading || (!prompt && !image)} className="w-full justify-center">
                                 {loading ? 'Generating Video...' : 'Generate with Veo'}
                             </Button>
                             <p className="text-xs text-gray-400 mt-2 text-center">* Requires paid API key. Generation takes ~30-60s.</p>
                         </div>
                     </div>
                 </Card>
            </div>

            <div className="flex flex-col h-full min-h-[400px]">
                <Card className="flex-1 flex flex-col items-center justify-center bg-black relative">
                     {loading ? (
                         <div className="text-center text-white">
                             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                             <p>Creating your video...</p>
                         </div>
                     ) : videoUrl ? (
                         <video controls className="w-full max-h-[500px]" src={videoUrl} autoPlay loop />
                     ) : (
                         <div className="text-gray-500 flex flex-col items-center">
                             <span className="material-icons text-6xl opacity-30">play_circle_outline</span>
                             <p className="mt-2 text-sm opacity-50">Video preview will appear here</p>
                         </div>
                     )}
                </Card>
            </div>
        </div>
    );
};

export default AIStudio;
