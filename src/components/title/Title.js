import React from 'react';
import './Title.scss';

const Title = ({title}) => {
    return (
        <div className="row title">
                <div className="col">
                     <h2 className="text-title">{title}</h2>
                     <div className="title-underline" />
                 </div>
             </div>
    )
};

export default Title;