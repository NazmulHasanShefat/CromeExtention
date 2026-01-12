const SettingsPanal = `
${
    <div class="settings_panal">
        <h1>color picker options</h1>
        <hr />
        <div class="seting_options">
            <div class="setting_1">
                <label for="clipBord_colorFormate">
                <p>Automatically copy picked color to clipboard.</p>
                <input type="checkbox" name="clipbordColorFormate" id="clipBord_colorFormate" />
                </label>
            </div>
            <div class="setting_1">
                <label for="showLowerCase">
                <p>Show Hex codes in lowercase.</p>
                <input type="checkbox" name="clipbordColorFormate" id="showLowerCase" />
                </label>
            </div>
            <div class="setting_1">
                <label for="enableKyeShotCut">
                <p>Enable color picking from page using keyboard shortcut Press <br /> <kbd>Ctrl</kbd> + <kbd>Z</kbd></p>
                <input type="checkbox" name="clipbordColorFormate" id="enableKyeShotCut" />
                </label>
            </div>
            <div class="setting_1">
                <label for="darkMood">
                <p>Dark mood</p>
                <input type="checkbox" name="clipbordColorFormate" id="darkMood" />
                </label>
            </div>
        </div>
        <div class="settings_btn">
            <button type="button" id="closeSettings">Close</button>
            <button type="button" id="saveSettings">Save</button>
        </div>
      </div> 
}
`