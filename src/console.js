const cmd = `
===
Controls:
WASD / Arrows : Movement
R : Restart level
M : Mute Sound
H : Help
I : Color Accessibility
\` : Toggle console
===
`

const WELCOME_MESSAGE = `
Welcome back to your world!

The world we created last weekend doesn't seem right...
A bunch of assets are missing... but fear not, they shouldn't be too far!
Push the correct asset to the highlighted area to complete the scene!

${cmd}
${isMobileDevice ? "" : "Press Enter to start a new game or C to continue . . ."}`

const END_GAME_MESSAGE = `
The world is now ready to receive the alien...
Go back to your heaven and watch them evolve through the century!

Thanks for playing!`
