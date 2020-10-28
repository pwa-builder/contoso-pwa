// THIS FILE IS AUTO GENERATED
// ANY CHANGES WILL BE LOST DURING BUILD
// MODIFY THE .SCSS FILE INSTEAD

import { css } from 'lit-element';
/**
 * exports lit-element css
 * @export styles
 */
export const styles = [
  css`
    /**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
    /*
  Your use of the content in the files referenced here is subject to the terms of the license at http://aka.ms/fabric-assets-license
*/
    /**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
    :host([hidden]) {
      display: none;
    }

    :host {
      display: block;
      --default-font-family: 'Segoe UI', 'Segoe UI Web (West European)',
        'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue',
        sans-serif;
      --theme-primary-color: #0078d7;
      --theme-dark-color: #005a9e;
    }

    .ms-Icon {
      display: inline-block;
      font-family: 'FabricMDL2Icons';
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      margin: 4px 0;
    }

    .ms-Icon--ChevronDown::before {
      content: '\\\E70D';
    }

    .ms-Icon--ChevronUp::before {
      content: '\\\E70E';
    }

    .ms-Icon--Contact::before {
      content: '\\\E77B';
    }

    .ms-Icon--AddFriend::before {
      content: '\\\E8FA';
    }

    .ms-Icon--OutlookLogoInverse::before {
      content: '\\\EB6D';
    }

    :host {
      border-radius: 2px;
      font-family: var(--default-font-family, 'Segoe UI');
      height: 38px;
      display: contents;
    }

    :host .root,
    mgt-people-mention .root {
      display: block;
    }

    :host .people-picker,
    mgt-people-mention .people-picker {
      position: relative;
      background-color: var(
        --input-background-color,
        var(--people-list-background-color, white)
      );
      padding-bottom: 6px;
      border: var(--input-border, 2px solid #b3b0ad);
      border-bottom: var(
        --input-border-bottom,
        var(--input-border, 2px solid #b3b0ad)
      );
      border-left: var(
        --input-border-left,
        var(--input-border, 2px solid #b3b0ad)
      );
      border-top: var(
        --input-border-top,
        var(--input-border, 2px solid #b3b0ad)
      );
      border-right: var(
        --input-border-right,
        var(--input-border, 2px solid #b3b0ad)
      );
    }
    :host .people-picker:hover,
    mgt-people-mention .people-picker:hover {
      border-color: var(--input-hover-color, #323130);
    }
    :host .people-picker.focused,
    mgt-people-mention .people-picker.focused {
      border-color: var(--input-focus-color, #0078d4);
    }

    :host .flyout-root,
    mgt-people-mention .flyout-root {
      padding: 0;
      border-radius: 2px;
      background-color: var(--dropdown-background-color, white);
      min-width: 260px;
      overflow-y: auto;
      text-align: left;
      list-style-type: none;
    }
    :host .flyout-root li,
    mgt-people-mention .flyout-root li {
      cursor: pointer;
    }

    :host .people-selected-input,
    mgt-people-mention .people-selected-input {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex: 1 0 auto;
      font-family: var(--default-font-family, 'Segoe UI');
      position: relative;
      border: none;
      line-height: normal;
      outline: none;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 19px;
      background-color: var(
        --input-background-color,
        var(--people-list-background-color, white)
      );
      color: var(--font-color, #323130);
    }
    :host .people-selected-input::placeholder,
    mgt-people-mention .people-selected-input::placeholder {
      color: var(--placeholder-default-color, #605e5c);
    }
    :host .people-selected-input:focus::placeholder,
    mgt-people-mention .people-selected-input:focus::placeholder {
      color: var(--placeholder-focus-color, #323130);
    }

    :host .people-selected-list,
    mgt-people-mention .people-selected-list {
      flex: 1 0 auto;
      display: flex;
      flex-wrap: wrap;
      vertical-align: middle;
      margin: 0 2px 0 0;
      list-style-type: none;
      padding-left: 8px;
      font-style: normal;
      font-weight: normal;
      overflow: hidden;
    }

    .overflow-gradient,
    mgt-people-mention .overflow-gradient {
      content: '';
      position: absolute;
      width: 15px;
      height: 90%;
      top: 0;
      right: 22px;
      background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 60%,
        #f1f1f1 100%
      );
      background-image: -moz-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 60%,
        #f1f1f1 100%
      );
      background-image: -o-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 60%,
        #f1f1f1 100%
      );
      background-image: -ms-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 60%,
        #f1f1f1 100%
      );
      background-image: -webkit-linear-gradient(
        left,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 60%,
        #f1f1f1 100%
      );
    }

    .CloseIcon,
    mgt-people-mention .CloseIcon {
      line-height: normal;
      font-family: 'FabricMDL2Icons';
      padding-right: 8px;
      margin-top: 0px;
      cursor: pointer;
      color: var(--font-color, #323130);
      background-color: #f1f1f1;
      right: 0px;
    }

    :host .people-person,
    mgt-people-mention .people-person {
      display: flex;
      margin: 5px 5px 0px 0;
      align-items: center;
      background-color: rgba(196, 196, 196, 0.24);
      border-radius: 15px;
      height: 24px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      position: relative;
    }

    :host .list-person,
    mgt-people-mention .list-person {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 12px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
    }
    :host .list-person:hover,
    mgt-people-mention .list-person:hover {
      background-color: var(
        --dropdown-item-hover-background,
        rgba(241, 241, 241, 0.87)
      );
    }

    :host .list-person.focused,
    mgt-people-mention .list-person.focused {
      background-color: var(
        --dropdown-item-hover-background,
        rgba(241, 241, 241, 0.87)
      );
    }

    :host .people-person-text,
    mgt-people-mention .people-person-text {
      font-size: 14px;
      font-weight: normal;
      margin: 0;
      padding: 0;
    }

    :host .input-search,
    mgt-people-mention .input-search {
      margin: 6px 2px 1px 3px;
    }

    :host .input-search.input-search--start,
    mgt-people-mention .input-search.input-search--start {
      margin: 6px 0px 1px 0px;
      line-height: normal;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }

    :host .people-picker-input,
    mgt-people-mention .people-picker-input {
      display: flex;
      flex-wrap: wrap;
      order: 2;
      background-color: var(
        --input-background-color,
        var(--people-list-background-color, white)
      );
      margin: var(--avatar-margin, 0 4px 0 0);
      font-size: 14px;
      line-height: 19px;
      cursor: text;
    }

    :host .duplicate-person,
    mgt-people-mention .duplicate-person {
      text-decoration: none;
      border-bottom: 1px solid red;
    }

    :host .remove-person-button,
    mgt-people-mention .remove-person-button {
      background: #767676;
      transform: matrix(-0.71, -0.71, 0.71, -0.71, 0, 0);
    }

    :host .remove-person-button-secondary,
    mgt-people-mention .remove-person-button-secondary {
      background: #767676;
      transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
    }

    :host .person-display-name,
    mgt-people-mention .person-display-name {
      max-width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 8px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: #000000;
    }

    mgt-person {
      --avatar-size-s: 32px;
      margin-left: 12px;
      cursor: default;
    }

    .selected-person {
      --avatar-size-s: 24px;
      margin-left: 0px;
      --color: $font-color;
      color: var(--font-color, #323130);
      margin-bottom: 1px;
      margin-right: 4px;
    }

    :host .search-error-text,
    :host .loading-text,
    mgt-people-mention .search-error-text,
    mgt-people-mention .loading-text {
      font-family: var(--default-font-family, 'Segoe UI');
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 19px;
      text-align: center;
      color: var(--font-color, #323130);
      margin-left: 50px;
      margin-right: 50px;
      color: #0078d4;
    }

    :host .SearchErrorIcon,
    mgt-people-mention .SearchErrorIcon {
      display: inline-block;
      font-family: 'FabricMDL2Icons';
      color: #cf0000;
    }

    :host .message-parent,
    mgt-people-mention .message-parent {
      padding: 2px;
      margin-top: 30px;
      margin-bottom: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    }
    :host .message-parent .spinner,
    mgt-people-mention .message-parent .spinner {
      border: 2px solid #c7e0f4;
      /* Light grey */
      border-top: 2px solid #0078d4;
      /* Blue */
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 2s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    :host .highlight-search-text,
    mgt-people-mention .highlight-search-text {
      font-weight: bold;
    }

    :host .people-person-job-title,
    mgt-people-mention .people-person-job-title {
      flex: 100%;
      order: 3;
      font-weight: normal;
      font-size: 12px;
    }
    :host .people-person-job-title.uppercase,
    mgt-people-mention .people-person-job-title.uppercase {
      text-transform: uppercase;
    }

    :host .people-person-text-area,
    mgt-people-mention .people-person-text-area {
      margin-left: 13px;
      flex: 1 1 0;
      max-height: 40px;
      overflow: hidden;
      color: var(--font-color, #323130);
    }

    mgt-flyout {
      flex: 1 0 auto;
    }
  `,
];
