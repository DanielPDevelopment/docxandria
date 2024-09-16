import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CiLink, CiBookmark, CiTrash } from 'react-icons/ci';
import { BiExpandAlt, BiCollapseAlt } from 'react-icons/bi';
import TerminalBlock from 'components/codeBlock/TerminalBlock';

const Result = ({ data, removeFromActiveResults, contentShow = true }) => {
  const { url, title, content, libIco, lib } = data;
  const [showDetails, setShowDetails] = useState(false);
  const showAmount = contentShow ? 500 : 0;

  return (
    <div className="bg-grayLighter w-full rounded-lg mb-5 flex flex-wrap p-8">
      <div className="flex flex-wrap justify-between w-full items-center">
        <div className="flex flex-wrap items-center">
          <div className="h-full mr-4">
            <img src={libIco} className="max-h-[50px]" alt="Library Icon" />
          </div>
          <div className="flex flex-wrap items-center">
            <div className="text-xs w-full">{lib}</div>
            <div className="text-2xl">{title}</div>
          </div>
          {showDetails ? (
            <BiCollapseAlt
              className="text-3xl cursor-pointer hover:text-primaryBlue"
              onClick={() => setShowDetails(false)}
            />
          ) : (
            <BiExpandAlt
              className="text-3xl cursor-pointer hover:text-primaryBlue"
              onClick={() => setShowDetails(true)}
            />
          )}
        </div>
        <div className="flex flex-wrap">
          <CiLink
            className="text-3xl cursor-pointer hover:text-primaryBlue"
            onClick={() => window.open(url)}
          />
          <CiBookmark className="text-3xl cursor-pointer hover:text-primaryBlue" />
          <CiTrash
            onClick={() => removeFromActiveResults({ data })}
            className="text-3xl cursor-pointer hover:text-primaryRed"
          />
        </div>
      </div>
      <div className="whitespace-pre-wrap p-4 font-mono overflow-hidden">
        {showDetails ? (
          <TerminalBlock
            codeLanguage="javascript"
            code={content}
            extra="!bg-grayLighter"
          />
        ) : (
          <TerminalBlock
            codeLanguage="javascript"
            code={`${content.substring(0, showAmount).trim()}...`}
            extra="!bg-grayLighter !overflow-hidden"
          />
        )}
      </div>
    </div>
  );
};

// PropTypes for Result component
Result.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    libIco: PropTypes.string.isRequired,
    lib: PropTypes.string.isRequired,
  }).isRequired,
  removeFromActiveResults: PropTypes.func.isRequired,
  contentShow: PropTypes.bool,
};

export default Result;
