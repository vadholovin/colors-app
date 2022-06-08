import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import { styled } from '@mui/material';
import './ColorBox.css';

const ColorName = styled('span', {
  shouldForwardProp: (props) => props !== 'isDarkBgColor'
})(({ isDarkBgColor, theme }) => ({
  color: isDarkBgColor ? '#fff' : '#000'
}));

const SeeMore = styled('span', {
  shouldForwardProp: (props) => props !== 'isLightBgColor'
})(({ isLightBgColor, theme }) => ({
  color: isLightBgColor ? 'rgba(0,0,0,0.5)' : '#fff'
}));

const CopyButton = styled('button', {
  shouldForwardProp: (props) => props !== 'isLightBgColor'
})(({ isLightBgColor, theme }) => ({
  color: isLightBgColor ? 'rgba(0,0,0,0.5)' : '#fff'
}));

const ColorValue = styled('p', {
  shouldForwardProp: (props) => props !== 'isLightBgColor'
})(({ isLightBgColor, theme }) => ({
  color: isLightBgColor ? 'rgba(0,0,0,0.5)' : '#fff'
}));

function ColorBox(props) {
  const { background, name, moreUrl, isShowingFullPalette } = props;
  const [copied, setCopied] = useState(false);
  const changeCopyState = () => {
    setCopied(true);
    setTimeout(function() {
      setCopied(false);
    }, 1500);
  };
  const isDarkBgColor = chroma(background).luminance() <= 0.08;
  const isLightBgColor = chroma(background).luminance() > 0.5;

  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className="ColorBox" style={{background}}>
        <div
          className={`ColorBox-copy-overlay ${copied ? 'show' : ''}`}
          style={{background}}
        />
        <div className={`ColorBox-copy-msg ${copied ? 'show' : ''}`}>
          <h2>Copied!</h2>
          <ColorValue isLightBgColor={isLightBgColor}>
            {background}
          </ColorValue>
        </div>
        <div className="ColorBox-copy-container">
          <div className="ColorBox-content">
            <ColorName isDarkBgColor={isDarkBgColor}>
              {name}
            </ColorName>
          </div>
          <CopyButton
            isLightBgColor={isLightBgColor}
            className="ColorBox-copy-button"
          >
            Copy
          </CopyButton>
        </div>
        {isShowingFullPalette && (
          <Link to={moreUrl} onClick={e => e.stopPropagation()}>
            <SeeMore
              isLightBgColor={isLightBgColor}
              className="ColorBox-see-more"
            >
              More
            </SeeMore>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
