import React, {useState} from 'react';

const Categories = ({categoryId, onClickCategoryId}) => {

  const categories = [
    'Всі',
    "М'ясні",
    'Вегетаріанські',
    'Гриль',
    'Гострі',
    'Закриті',
  ]
  return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => {
            return (
                <li key={index} onClick={() => onClickCategoryId(index)} className={categoryId === index ? 'active' : ''}>
                  {category}
                </li>
            )
          })}

        </ul>
      </div>
  );
};

export default Categories;