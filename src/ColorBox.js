import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import './ColorBox.css';

export default function ColorBox(props) {
  const { background, name, moreUrl, showLink } = props;
  const [copied, setCopied] = useState(false);
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(function() {
      setCopied(false);
    }, 1500);
  };
  const isDarkColor = chroma(background).luminance() <= 0.08;
  const isLightColor = chroma(background).luminance() > 0.5;

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="ColorBox" style={{background}}>
        <div
          className={`ColorBox-copy-overlay ${copied && 'show'}`}
          style={{background}}
        />
        <div className={`ColorBox-copy-msg ${copied && 'show'}`}>
          <h2>Copied!</h2>
          <p className={isLightColor && 'dark-text'}>{background}</p>
        </div>
        <div className="ColorBox-copy-container">
          <div className="ColorBox-content">
            <span className={isDarkColor && 'light-text'}>
              {name}
            </span>
          </div>
          <button className={`ColorBox-copy-button ${isLightColor && 'dark-text'}`}>Copy</button>
        </div>
        {showLink && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <span className={`ColorBox-see-more ${isLightColor && 'dark-text'}`}>More</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
