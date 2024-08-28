import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import SubcategoryCard from '@/components/Card/SubcategoryCard';
import { texts } from '@/constants/texts';

const HomeCategoryCard = ({ darkMode }) => {
    // Define the function that handles category clicks
    const handleCategoryClick = (categoryId) => {
        console.log('Selected category ID:', categoryId);
        // You can add additional logic here
    };

    return (
        <>
            <SectionTitle
                title={texts.homeScreen.section_second?.title || 'Default Section Title'}
                text={texts.homeScreen.section_second?.text || 'Default Section Text'}
                iconName="help-circle"
                popupTitle={texts.homeScreen.section_second?.popup?.title || 'Default Popup Title'}
                popupText={texts.homeScreen.section_second?.popup?.text || 'Default Popup Text'}
                popupButtonText={texts.homeScreen.section_second?.popup?.button || 'Default Button Text'}
                darkMode={darkMode}
            />
            <SubcategoryCard
                darkMode={darkMode}
                onCategoryClick={handleCategoryClick} // Pass the function here
            />
        </>
    );
};

export default HomeCategoryCard;

