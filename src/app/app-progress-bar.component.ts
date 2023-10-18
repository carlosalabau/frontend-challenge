// Based on https://codepen.io/salazarr-js/pen/aJdmvw
import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  `,
  styles: [
    `
      @import 'settings/variables';

      :host {
        display: inline-block;
        width: 100%;
      }

      .progress {
        position: relative;
        height: 4px;
        display: block;
        width: 100%;
        background-color: lighten($primary, 35%);
        border-radius: 2px;
        overflow: hidden;
        .indeterminate {
          background-color: $primary;
          &:before {
            content: '';
            position: absolute;
            background-color: inherit;
            top: 0;
            left: 0;
            bottom: 0;
            will-change: left, right;
            animation: indeterminate 2.1s
              cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
          }
          &:after {
            content: '';
            position: absolute;
            background-color: inherit;
            top: 0;
            left: 0;
            bottom: 0;
            will-change: left, right;
            animation: indeterminate-short 2.1s
              cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
            animation-delay: 1.15s;
          }
        }
      }

      @keyframes indeterminate {
        0% {
          left: -35%;
          right: 100%;
        }
        60% {
          left: 100%;
          right: -90%;
        }
        100% {
          left: 100%;
          right: -90%;
        }
      }

      @keyframes indeterminate-short {
        0% {
          left: -200%;
          right: 100%;
        }
        60% {
          left: 107%;
          right: -8%;
        }
        100% {
          left: 107%;
          right: -8%;
        }
      }
    `,
  ],
})
export class AppProgressBarComponent {}
