import { createGlobalStyle } from 'styled-components';

import ToDoList from './components/ToDoList';

const GlobalStyle = createGlobalStyle`

/***
    The new CSS reset - version 1.9 (last updated 19.6.2023)
    GitHub page: https://github.com/elad2412/the-new-css-reset
***/

/*
    Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property
    - The "symbol *" part is to solve Firefox SVG sprite bug
    - The "html" element is excluded, otherwise a bug in Chrome breaks the CSS hyphens property (https://github.com/elad2412/the-new-css-reset/issues/36)
 */
    *:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *)) {
    all: unset;
    display: revert;
}

/* Preferred box-sizing value */
*,
*::before,
*::after {
    box-sizing: border-box;
}

/* Reapply the pointer cursor for anchor tags */
a, button {
    cursor: revert;
}

/* Remove list styles (bullets/numbers) */
ol, ul, menu {
    list-style: none;
}

/* For images to not be able to exceed their container */
img {
    max-inline-size: 100%;
    max-block-size: 100%;
}

/* removes spacing between cells in tables */
table {
    border-collapse: collapse;
}

/* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
input, textarea {
    -webkit-user-select: auto;
}

/* revert the 'white-space' property for textarea elements on Safari */
textarea {
    white-space: revert;
}

/* minimum style to allow to style meter element */
meter {
    -webkit-appearance: revert;
    appearance: revert;
}

/* preformatted text - use only for this feature */
:where(pre) {
    all: revert;
}

/* reset default text opacity of input placeholder */
::placeholder {
    color: unset;
}

/* remove default dot (•) sign */
::marker {
    content: initial;
}

/* fix the feature of 'hidden' attribute.
   display:revert; revert to element instead of attribute */
:where([hidden]) {
    display: none;
}

/* revert for bug in Chromium browsers
   - fix for the content editable attribute will work properly.
   - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element*/
:where([contenteditable]:not([contenteditable="false"])) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
    -webkit-user-select: auto;
}

/* apply back the draggable feature - exist only in Chromium and Safari */
:where([draggable="true"]) {
    -webkit-user-drag: element;
}

/* Revert Modal native behavior */
:where(dialog:modal) {
    all: revert;
}
* {
  box-sizing: border-box;
}
body{
  font-family: 'Source Sans 3', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
  
}
a{
  text-decoration: none;
}
input {
  background-color: white;
  color: #1a1a1a;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #b0b0b0;
  color: #1a1a1a;
  padding: 8px 16px;
  border: 1px solid #666666;
  border-radius: 4px;
  cursor: pointer;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
