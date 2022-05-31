import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

export default function ColorBox({ background, name }) {
  return (
    <CopyToClipboard text={background}>
      <div className="ColorBox" style={{background}}>
        <div className="ColorBox-copy-container">
          <div className="ColorBox-content">
            <span>{name}</span>
          </div>
          <button className="ColorBox-copy-button">Copy</button>
        </div>
        <span className="ColorBox-see-more">More</span>
      </div>
    </CopyToClipboard>
  );
}
