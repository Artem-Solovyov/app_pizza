import React from 'react';

const categories = [
  'Всі',
  "М'ясні",
  'Вегетаріанські',
  'Гриль',
  'Гострі',
  'Закриті',
]

type PropsType = {
  categoryId: number
  onClickCategoryId: (index: number) => void
}

const Categories: React.FC<PropsType> = React.memo(({categoryId, onClickCategoryId}) => {

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
})

export default Categories;