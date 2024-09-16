import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PropTypes from 'prop-types';

const TerminalBlock = ({ codeLanguage, code, extra = '' }) => (
  <SyntaxHighlighter
    language={codeLanguage}
    style={materialDark}
    customStyle={{ fontSize: '13px' }}
    className={`module-content ${extra}`}
  >
    {code}
  </SyntaxHighlighter>
);

// Define prop types for the TerminalBlock component
TerminalBlock.propTypes = {
  codeLanguage: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  extra: PropTypes.string,
};

export default TerminalBlock;
