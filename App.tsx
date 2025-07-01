
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextAreaInput from './components/TextAreaInput';
import TransformationOptionsInput from './components/TransformationOptionsInput';
import IntensitySlider from './components/IntensitySlider';
import Button from './components/Button';
import { humanizeText } from './services/geminiService';
import { TransformationOptionsState, TransformationOptionKey } from './types';
import { DEFAULT_TRANSFORMATION_OPTIONS, INITIAL_INTENSITY } from './constants';

const CopyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.625v2.625a1.125 1.125 0 01-1.125 1.125H12m6.037-12.037a.75.75 0 00-1.06-1.06L9 9.19l-1.97-1.97a.75.75 0 00-1.06 1.06L7.94 10.25l-1.97 1.97a.75.75 0 101.06 1.06L9 11.31l1.97 1.97a.75.75 0 001.06-1.06L10.06 10.25l6.037-6.037z" />
  </svg>
);

const WandIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>
);


const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transformationOptions, setTransformationOptions] = useState<TransformationOptionsState>(DEFAULT_TRANSFORMATION_OPTIONS);
  const [intensity, setIntensity] = useState<number>(INITIAL_INTENSITY);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<string>('');

  useEffect(() => {
    if (!process.env.API_KEY) {
      setApiKeyMissing(true);
      setError("Gemini API Key is not configured. Please set the API_KEY environment variable.");
    }
  }, []);

  const handleTransformationOptionChange = useCallback((optionKey: TransformationOptionKey, value: boolean) => {
    setTransformationOptions(prev => ({ ...prev, [optionKey]: value }));
  }, []);

  const handleIntensityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIntensity(Number(event.target.value));
  }, []);

  const handleHumanizeText = useCallback(async () => {
    if (apiKeyMissing) {
      setError("Cannot process: Gemini API Key is not configured.");
      return;
    }
    if (!inputText.trim()) {
      setError("Please enter some text to humanize.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setOutputText('');
    setCopySuccess('');

    try {
      const result = await humanizeText(inputText, transformationOptions, intensity);
      setOutputText(result);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, transformationOptions, intensity, apiKeyMissing]);

  const handleCopyOutput = useCallback(() => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setCopySuccess('Copied to clipboard!');
        // Fix: Corrected arrow function syntax for setTimeout
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setCopySuccess('Failed to copy.');
        // Fix: Corrected arrow function syntax for setTimeout
        setTimeout(() => setCopySuccess(''), 2000);
      });
  }, [outputText]);


  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Controls Column */}
          <div className="md:col-span-1 space-y-6">
            <TransformationOptionsInput
              options={transformationOptions}
              onChange={handleTransformationOptionChange}
            />
            <IntensitySlider
              value={intensity}
              onChange={handleIntensityChange}
            />
             <Button
                onClick={handleHumanizeText}
                label="Humanize Text"
                disabled={isLoading || apiKeyMissing || !inputText.trim()}
                isLoading={isLoading}
                icon={<WandIcon />}
              />
              {error && (
                <div className="mt-4 p-3 bg-red-700 border border-red-500 text-red-100 rounded-md text-sm">
                  <strong>Error:</strong> {error}
                </div>
              )}
          </div>

          {/* Text Areas Column */}
          <div className="md:col-span-2 space-y-6">
            <TextAreaInput
              id="inputText"
              label="Your AI-Generated Text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                if (error && inputText.trim()) setError(null);
              }}
              placeholder="Paste your AI-generated text here..."
              rows={10}
              labelColorClass="text-sky-400"
            />
            
            <div className="relative">
               <TextAreaInput
                id="outputText"
                label="Humanized Text"
                value={outputText}
                placeholder="Your humanized text will appear here..."
                isReadOnly
                rows={10}
                labelColorClass="text-emerald-400"
              />
              {outputText && (
                <div className="absolute top-0 right-0 mt-10 mr-2">
                  <Button 
                    onClick={handleCopyOutput}
                    label={copySuccess ? copySuccess : "Copy"}
                    variant="secondary"
                    icon={!copySuccess ? <CopyIcon /> : undefined}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;