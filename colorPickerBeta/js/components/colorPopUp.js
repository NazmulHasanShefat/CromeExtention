const dropShadow = `<div class="drop_shadow"></div>`;
const colorPopup = `
 ${
   <div class="popup">
        <div class="close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="#0F1729" />
            </svg>
        </div>
        <div class="cp_btn_container"> <button type="button" class="pick_button" id="copy_rgba">copy rgba</button></div>
        <div class="p_color_box">
            <span>23423</span>
            <span style="float: inline-end; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="17px" viewBox="0 0 24 24" fill="none">
                    <path opacity="0.5"
                        d="M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V10.0002C3 7.17179 3 5.75757 3.87868 4.87889C4.64706 4.11051 5.82497 4.01406 8 4.00195"
                        stroke="#1C274C" stroke-width="1.5" />
                    <path d="M8 14H16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M7 10.5H17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M9 17.5H15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path
                        d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                        stroke="#1C274C" stroke-width="1.5" />
                </svg>
            </span>
        </div>
        <div class="cp_btn_container"> <button type="button" class="pick_button" id="copy_rgba">copy rgba</button></div>
        <div class="p_color_box">
            <span>23432</span>
             <span style="float: inline-end; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="17px" viewBox="0 0 24 24" fill="none">
                    <path opacity="0.5"
                        d="M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V10.0002C3 7.17179 3 5.75757 3.87868 4.87889C4.64706 4.11051 5.82497 4.01406 8 4.00195"
                        stroke="#1C274C" stroke-width="1.5" />
                    <path d="M8 14H16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M7 10.5H17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M9 17.5H15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path
                        d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                        stroke="#1C274C" stroke-width="1.5" />
                </svg>
            </span>
        </div>
        <div class="cp_btn_container"> <button type="button" class="pick_button" id="copy_rgba">copy rgba</button></div>
        <div class="p_color_box">
            <span>23424</span>
             <span style="float: inline-end; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="17px" viewBox="0 0 24 24" fill="none">
                    <path opacity="0.5"
                        d="M16 4.00195C18.175 4.01406 19.3529 4.11051 20.1213 4.87889C21 5.75757 21 7.17179 21 10.0002V16.0002C21 18.8286 21 20.2429 20.1213 21.1215C19.2426 22.0002 17.8284 22.0002 15 22.0002H9C6.17157 22.0002 4.75736 22.0002 3.87868 21.1215C3 20.2429 3 18.8286 3 16.0002V10.0002C3 7.17179 3 5.75757 3.87868 4.87889C4.64706 4.11051 5.82497 4.01406 8 4.00195"
                        stroke="#1C274C" stroke-width="1.5" />
                    <path d="M8 14H16" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M7 10.5H17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M9 17.5H15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" />
                    <path
                        d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                        stroke="#1C274C" stroke-width="1.5" />
                </svg>
            </span>
        </div>
        <div class="dt_btn_container">
            <button type="button" class="btn_delete" id="delete">
                delete
            </button>
        </div>
    </div>
 }
`;