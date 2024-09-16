import React, { useState } from 'react';
import InputField from 'components/fields/InputField';
import TextField from 'components/fields/TextField';
import { GrHelpBook } from 'react-icons/gr';
import { useAuth } from 'contexts/user/AuthContext';
import { useLibrary } from 'contexts/libraries/LibraryContext';

const initialData = {
  name: '',
  description: '',
  url: '',
  header: '',
  content: '',
};

export default function AddLibraryForm() {
  const [formData, setFormData] = useState(initialData);
  const [showHelp, setShowHelp] = useState(false);
  const { addLibrary, isLoading, setAddingLibrary } = useLibrary();
  const { user } = useAuth();
  const [errors, setErrors] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const keyErrors = Object.keys(formData).reduce((acc, item) => {
      if (!formData[item]) {
        acc.push(`${item} required`);
      }
      return acc;
    }, []);

    if (keyErrors.length) {
      setErrors(keyErrors[0]);
      return;
    }

    const results = await addLibrary(formData);
    if (results?.errors?.length) {
      setErrors(results.errors[0]?.msg || results.errors.msg);
    } else {
      setAddingLibrary(false);
    }
  };

  return (
    <div className="w-full flex flex-wrap justify-center my-10">
      <div className="bg-grayLighter md:w-full p-4 lg:p-10 rounded-lg xl:px-20 shadow-xl w-full xl:w-[80%] px-0 md:px-10 text-white flex flex-wrap overflow-hidden">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-10">
            <div className="w-full">
            {/* Library Name */}
              <InputField
                variant="auth"
                extra="mb-3 lg:min-w-[400px]"
                label="Library Name*"
                placeholder="[ Library Name ]"
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            {/* Library Url */}
              <InputField
                variant="auth"
                extra="mb-3"
                height="100px"
                label="Url"
                placeholder="[ Library URL ]"
                id="url"
                type="text"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />

              <div className="w-full">
                <div
                  className="flex flex-wrap items-center hover:text-primaryYellow cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => setShowHelp((prev) => !prev)}
                >
                  <GrHelpBook className="mr-2 text-primaryYellow" />
                  Training Data Info
                </div>
                {showHelp && (
                  <div className="text-sm font-mono whitespace-pre-wrap">
                    {`It's super important that we understand how the documentation structure is on the documentation website.
                    \nFor Example:
                    \nOn the react docs page [https://react.dev/reference/react/useDebugValue] we see that 'useDebugValue' is the HEADER and <article> is the outer structure of the CONTENT on the page. [Will flesh this idea out better later]
                    \nWe use this to get an idea of the structure of the documentation to then ingest the library for use here!`}
                  </div>
                )}
              </div>
            {/* Header  */}
              <InputField
                variant="auth"
                extra="mb-3"
                height="100px"
                label="Header"
                placeholder="[ Header ]"
                id="header"
                type="text"
                value={formData.header}
                onChange={(e) => setFormData({ ...formData, header: e.target.value })}
              />

            {/* Content element container */}
              <InputField
                variant="auth"
                extra="mb-3"
                height="100px"
                label="Content"
                placeholder="[ Content Element Container] ie-> <div class='main'>"
                id="content"
                type="text"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="w-full lg:max-w-[420px]">
              <TextField
                variant="auth"
                extra="mb-3"
                height="100px"
                label="Description"
                placeholder="[ Description ]"
                id="description"
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              {user?.restricted && (
                <p className="mt-2 mb-2 text-base text-red-600">
                  {user.email} is a restricted user. 
                  <br />
                  <span>Cannot add new libraries.</span>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start mt-2">
            <button
              className="mb-4 md:mb-auto linear md:w-[150px] w-full rounded-xl bg-brand-400 py-[12px] text-sm text-white transition-all duration-300 ease-in-out hover:bg-brand-600 active:bg-brand-700"
              disabled={isLoading || user?.restricted}
            >
              Add Library
            </button>

            <button
              className="md:ml-6 linear md:w-[150px] w-full rounded-xl bg-red-700 py-[12px] text-sm text-white transition-all duration-300 ease-in-out hover:bg-red-900 active:bg-red-700"
              onClick={() => setAddingLibrary(false)}
              type="button"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>

          <p className="mt-2 mb-2 text-base text-red-600">
            {errors ? `${errors} ☝` : ''}
          </p>
        </form>
      </div>
    </div>
  );
}
