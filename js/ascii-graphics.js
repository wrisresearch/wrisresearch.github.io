// ============================================================
// COMP266 - ASCII Graphics Banner
// Author: Michel Deosaran
// Date: Jan 16, 2026
// Source Attribution: https://codepen.io/harry-roy-mclaughlin/pen/gbbEVWW
//
// Purpose:
// Renders an animated ASCII spiral in a banner (#stage)
// with a logo reveal animation and scrambling effect.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    const stage = document.getElementById('stage');

    const stageContainer = document.getElementById('stage-container');
    stageContainer.classList.add('visible');

    // --- Guard Clause ---
    if (!stage) {
        console.error('Stage element #stage not found for ASCII spiral.');
        return;
    }

    // --- Stage Initialization ---
    stage.style.opacity = '0.4';
    let stageHeight = stage.clientHeight;
    let stageWidth = stage.clientWidth;

    // Compute number of rows and columns for ASCII grid
    let rows = Math.floor(stageHeight / 12); // adjust for vertical spacing
    let cols = Math.floor(stageWidth / 6);   // adjust for horizontal spacing

    // Glyphs used for spiral density
    const glyphs = " .:-=+*#%@";

    // Logo text (ASCII art) to reveal in animation
    const logoText = [
''
    ];

    // Characters for scrambling effect
    const scrambleChars = "▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯";

    // --- Generate Scrambled Logo Versions ---
    const logoTextScrambled = [];
    const scrambleSteps = 18;

    for (let level = scrambleSteps - 1; level >= 0; level--) {
        const currentScramble = [];

        logoText.forEach(line => {
            let newLine = '';
            for (let char of line) {
                if (char === " ") {
                    newLine += " ";
                } else if (Math.random() < level / (scrambleSteps - 1)) {
                    newLine += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                } else {
                    newLine += char;
                }
            }
            currentScramble.push(newLine);
        });

        logoTextScrambled.push(currentScramble);
    }

    // Add original logo as final state
    logoTextScrambled.push(logoText);

    // --- Logo positioning for centering ---
    const logoHeight = logoText.length;
    const logoWidth = logoText[0].length;
    const logoStartRow = Math.floor(rows / 2 - logoHeight / 2);
    const logoStartCol = Math.floor(cols / 2 - logoWidth / 2);

    let animationFrameId = null;

    // --- Main Animation Function ---
    function frame(time) {
        const e = time * 0.0009 + 0.8; // time scaling factor
        const out = [];
        const k = glyphs.length / 2;

        // Timing phases
        const revealPhase = Math.PI / 2.5;
        const unscrambleDuration = 1.0;
        const unscrambleStartTime = revealPhase + 0.1;
        const unscrambleEndTime = unscrambleStartTime + unscrambleDuration;

        // Determine current scrambled logo
        let currentLogo = logoText;
        if (e > unscrambleStartTime && e < unscrambleEndTime) {
            const progress = (e - unscrambleStartTime) / unscrambleDuration;
            const index = Math.min(logoTextScrambled.length - 1,
                Math.floor(progress * logoTextScrambled.length)
            );
            currentLogo = logoTextScrambled[index];
        } else if (e >= unscrambleEndTime) {
            currentLogo = logoText;
        }

        // Build ASCII grid row by row
        for (let y = 0; y < rows; y++) {
            let rowString = '';
            const Y = (y - rows / 2) / (rows / 2);

            for (let x = 0; x < cols; x++) {
                const X = (x - cols / 2) / (cols / 2);
                const l = Math.hypot(X, Y);
                let a = Math.atan2(Y, X);
                let char_idx = 0;
                let ch = glyphs[0];

                // Spiral pattern within unit circle
                if (l < 1.0) {
                    a += e + l * Math.PI;
                    char_idx = Math.floor(
                        (Math.cos(a * 3 + l * 2 + e * 2) + Math.sin(a * 2 - l * 3 + e * 3)) / 2 * k + k
                    );
                    char_idx = Math.max(0, Math.min(glyphs.length - 1, char_idx));
                    ch = glyphs[char_idx];
                }

                // Overlay logo characters
                const lr = y - logoStartRow;
                const lc = x - logoStartCol;
                if (e > revealPhase &&
                    lr >= 0 && lr < logoHeight &&
                    lc >= 0 && lc < logoWidth &&
                    currentLogo[lr][lc] !== " ") {

                    const pct = Math.min(1, (e - revealPhase) / 0.2);
                    ch = pct > 0.5
                        ? (e >= unscrambleEndTime
                            ? `<span style="color: #a0e6d8ff; text-shadow: 0 0 5px #a2eadcff;">${currentLogo[lr][lc]}</span>`
                            : currentLogo[lr][lc])
                        : glyphs[Math.min(glyphs.length - 1, char_idx + Math.floor(pct * 10))];
                }

                rowString += ch;
            }
            out.push(rowString);
        }

        // Render ASCII grid
        stage.innerHTML = out.map(row => `<pre>${row}</pre>`).join('');
        animationFrameId = requestAnimationFrame(frame);
    }

    // --- Handle Window Resize ---
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            stageHeight = stage.clientHeight;
            stageWidth = stage.clientWidth;
            rows = Math.floor(stageHeight / 12);
            cols = Math.floor(stageWidth / 6);

            requestAnimationFrame(frame);
        }, 250); // debounce
    });

    // --- Start Animation ---
    requestAnimationFrame(frame);
});
