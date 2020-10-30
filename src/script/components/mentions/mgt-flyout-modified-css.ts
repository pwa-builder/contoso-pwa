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
    .root .flyout {
      display: none;
      position: fixed;
      z-index: 9999999;
      opacity: 0;
      box-shadow: 0 3.2px 7.2px 0 rgba(0, 0, 0, 0.132),
        0 0.6px 1.8px 0 rgba(0, 0, 0, 0.108);
    }

    .root.visible .flyout {
      display: inline-block;
      animation-name: fadeIn;
      animation-duration: 0.3s;
      animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
      animation-fill-mode: both;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        margin-top: -10px;
        margin-bottom: -10px;
      }
      to {
        opacity: 1;
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  `,
];
