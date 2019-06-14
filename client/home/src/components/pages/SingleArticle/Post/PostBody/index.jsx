/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
import React from 'react';
import reactHtmlParser from 'react-html-parser';

export default function index({ body }) {  
  return (
    <>
    {reactHtmlParser(body)}
    </>
  );
}
