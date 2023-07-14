/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from "react";
import starImage from "../assets/star.png"; 

export default function Card(props) {
  let badgeClass = '';

  if (props.item.openSpots === 0) {
    badgeClass = 'SOLD OUT';
  } else if (props.item.location === 'Online') {
    badgeClass = 'ONLINE';
  }

  return (
    <div className="card">
      {badgeClass && (
        <div className={`card--badge ${badgeClass}`}>
          {badgeClass === 'SOLD OUT' ? 'SOLD OUT' : 'ONLINE'}
        </div>
      )}
      <img src={props.item.coverImg} className="card--image" alt="Cover" />
      <div className="card--stats">
        <img src={starImage} className="card--star" alt="Star" />
        <span>{props.item.stats.rating}</span>
        <span className="gray">({props.item.stats.reviewCount}) • </span>
        <span className="gray">{props.item.location}</span>
      </div>
      <p className="card--title">{props.item.title}</p>
      <p className="card--price">
        <span className="bold">From ${props.item.price}</span> / person
      </p>
    </div>
  );
}
