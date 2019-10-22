import React from 'react';

interface IToolBlockProps {
    type: string;
    value: number;
    handleClick: Function;
}
const ToolBlock: React.FC<IToolBlockProps> = ({ type, value, handleClick }) => {
    return (
        <div>
            <div>{`${type} Length`}</div>
            <div>
                <button id={`${type}-decrement`} onClick={() => handleClick(false, type)} >-</button>
                <div id={`${type}-length`}>{value}</div>
                <button id={`${type}-increment`} onClick={() => handleClick(true, type)}>+</button>
            </div>
        </div>

    )
}

export default ToolBlock;