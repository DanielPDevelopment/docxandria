import PropTypes from 'prop-types';

const ResultPlaceholder = ({ message }) => {
  return (
    <div className="w-full rounded-lg mb-5 flex flex-wrap p-8 border-dashed border-2 border-grayLighter">
      <div className="flex flex-wrap justify-between w-full items-center">
        <div className="flex flex-wrap items-center">
          <div className="h-full mr-4">
            <img src="" className="max-h-[50px]" alt="Placeholder Icon" />
          </div>
          <div className="flex flex-wrap items-center">
            <div className="text-xs w-full"></div>
            <div className="text-2xl"></div>
          </div>
        </div>
        <div className="flex flex-wrap"></div>
      </div>
      <div className="whitespace-pre-wrap p-4 font-mono text-grayBlue/50 m-auto text-center">
        {message}
      </div>
    </div>
  );
};

// PropTypes for ResultPlaceholder component
ResultPlaceholder.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ResultPlaceholder;
