import TerminalBlock from "../../components/codeBlock/TerminalBlock";
import { BsFillQuestionDiamondFill } from "react-icons/bs";

// Styling for clickable elements
export const clickableStyling = 'text-white mr-2 text-2xl cursor-pointer hover:text-brand-400';

// Functional component to render help content with customizable options
export function connectHelpGeneral({
    showHelp,
    setShowHelp,
    codeLanguage,
    code,
    CallOut,
    orientation = 'top',
    extra,
    extraCallOut,
    iconColor,
    standardHelpMessage = ''
}) {
    // Normalize orientation value to lowercase for consistent comparison
    const orientationSanitized = orientation.toLowerCase();
    
    return (
        <div className={`${extra}`}>
            {/* Render TerminalBlock if `showHelp` is true, `code` is provided, 
                `standardHelpMessage` is not set, and orientation is 'top' */}
            {showHelp && code && !standardHelpMessage && orientationSanitized === 'top' ? (
                <TerminalBlock
                    codeLanguage={codeLanguage}
                    code={code}
                />
            ) : ''}
            
            {/* Render standard help message if `showHelp` is true, 
                `code` is not provided, `standardHelpMessage` is set, 
                and orientation is 'top' */}
            {showHelp && !code && standardHelpMessage && orientationSanitized === 'top' ? (
                <div className="font-mono text-xs">{standardHelpMessage}</div>
            ) : ''}
            
            {/* Render help callout section with an optional icon and styling */}
            <div
                className={`flex items-center w-full text-gray-400 text-xs 
                ${orientationSanitized === 'top' ? 'mb-2' : ''} 
                ${code || standardHelpMessage ? 'cursor-pointer hover:text-brand-400' : ''} 
                ${extraCallOut ? extraCallOut : ''} 
                ${iconColor ? '!text-' + iconColor : ''}`}
                onClick={code || standardHelpMessage ? () => setShowHelp((prev) => !prev) : null}
            >
                {/* Icon for the help callout, with optional color */}
                <BsFillQuestionDiamondFill className={`mr-2 ${iconColor ? 'text-' + iconColor : ''}`} />
                {CallOut}
            </div>
            
            {/* Render TerminalBlock if `showHelp` is true, `code` is provided, 
                `standardHelpMessage` is not set, and orientation is 'bottom' */}
            {showHelp && code && !standardHelpMessage && orientationSanitized === 'bottom' ? (
                <TerminalBlock
                    codeLanguage={codeLanguage}
                    code={code}
                />
            ) : ''}
            
            {/* Render standard help message if `showHelp` is true, 
                `code` is not provided, `standardHelpMessage` is set, 
                and orientation is 'bottom' */}
            {showHelp && !code && standardHelpMessage && orientationSanitized === 'bottom' ? (
                <div className="font-mono text-xs py-1">{standardHelpMessage}</div>
            ) : ''}
        </div>
    );
}
