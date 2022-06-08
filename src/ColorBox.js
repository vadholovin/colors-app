import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { Box } from '@mui/system';
import './ColorBox.css';

export default function ColorBox(props) {
  const { background, name, moreUrl, isShowingFullPalette } = props;
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
          className={`ColorBox-copy-overlay ${copied ? 'show' : null}`}
          style={{background}}
        />
        <div className={`ColorBox-copy-msg ${copied ? 'show' : null}`}>
          <h2>Copied!</h2>
          <p className={isLightColor ? 'dark-text' : null}>{background}</p>
        </div>
        <div className="ColorBox-copy-container">
          <div className="ColorBox-content">
            <Box
              component="span"
              sx={{
                color: isDarkColor ? '#fff' : null
              }}
            >
              {name}
            </Box>
          </div>
          <Box
            component="button"
            className="ColorBox-copy-button"
            sx={{
              color: isLightColor ? 'rgba(0,0,0,0.5)' : null
            }}
          >
            Copy
          </Box>
        </div>
        {isShowingFullPalette && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <Box
              component="span"
              className="ColorBox-see-more"
              sx={{
                color: isLightColor ? 'rgba(0,0,0,0.5)' : null
              }}
            >
              More
            </Box>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
