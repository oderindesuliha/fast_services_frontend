import React from 'react';

interface BarChartProps {
    data: {
        labels: string[];
        values: number[];
        colors: string[];
    };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const maxValue = Math.max(...data.values);

    return (
        <div className="w-full h-64 flex flex-col">
            <div className="flex-grow flex items-end justify-around space-x-2 border-l border-b border-gray-300 dark:border-gray-600 pl-2 pb-1">
                {data.values.map((value, index) => {
                    const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
                    return (
                        <div key={index} className="w-full flex flex-col items-center">
                            <div
                                className="w-full rounded-t-md hover:opacity-80 transition-opacity"
                                style={{ height: `${heightPercentage}%`, backgroundColor: data.colors[index] }}
                                title={`${data.labels[index]}: ${value}`}
                            >
                                <span className="text-xs text-white text-center block pt-1">{value}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-around mt-2 text-xs text-gray-500 dark:text-gray-400">
                {data.labels.map((label, index) => (
                    <span key={index} className="w-full text-center truncate px-1">{label}</span>
                ))}
            </div>
        </div>
    );
};

export default BarChart;
