import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './ColorBox.css';

export default function ColorBox(props) {
  const { background, name, moreUrl } = props;
  const [copied, setCopied] = useState(false);
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(function() {
      setCopied(false);
    }, 1500);
  };

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="ColorBox" style={{background}}>
        <div
          className={`ColorBox-copy-overlay ${copied && 'show'}`}
          style={{background}}
        />
        <div className={`ColorBox-copy-msg ${copied && 'show'}`}>
          <h2>Copied!</h2>
          <p>{background}</p>
        </div>
        <div className="ColorBox-copy-container">
          <div className="ColorBox-content">
            <span>{name}</span>
          </div>
          <button className="ColorBox-copy-button">Copy</button>
        </div>
        <Link to={moreUrl} onClick={e => e.stopPropagation()}>
          <span className="ColorBox-see-more">More</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
}
