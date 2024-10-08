import { useState } from 'react';

const useFilter = () => {
    const [filter, setFilter] = useState('all');

    const applyFilter = (words) => {
        console.log('Words before filtering:', words);

        const filteredWords = words.filter((word) => {
            const hasUndefinedSign = word.signes.some(signe => (signe.url_sign || '').includes('Non spécifié'));
            const hasUndefinedDefinition = word.signes.some(signe => (signe.url_def || '').includes('Non spécifié'));

            switch (filter) {
                case 'easy':
                    return !(hasUndefinedSign || hasUndefinedDefinition);
                case 'medium':
                    return (hasUndefinedSign || hasUndefinedDefinition) && !(hasUndefinedSign && hasUndefinedDefinition);
                case 'hard':
                    return hasUndefinedSign && hasUndefinedDefinition;
                case 'all':
                default:
                    return true;
            }
        });

        console.log('Filtered Words:', filteredWords);
        return { filteredWords, count: filteredWords.length };
    };

    return [filter, setFilter, applyFilter];
};

export default useFilter;
