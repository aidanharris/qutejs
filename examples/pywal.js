#!/usr/bin/env node

/*
 * NOTE: This will override your settings, please back them up if this is important to you
 */
const qutejs = require('qutejs');

const wal = require(process.env.HOME + '/.cache/wal/colors.json')

// based on - https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#5624139
const hexToRgb = hex => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const foreground = wal.special.foreground;
const background = wal.special.background;
const cursor = wal.special.cursor;

const colors = {
  "black":    wal.colors.color0,
  "red":      wal.colors.color1,
  "green":    wal.colors.color2,
  "yellow":   wal.colors.color3,
  "blue":     wal.colors.color4,
  "magenta":  wal.colors.color5,
  "cyan":     wal.colors.color6,
  "white":    wal.colors.color7,
  "grey":     wal.colors.color8,
  "color0":   wal.colors.color0,
  "color1":   wal.colors.color1,
  "color2":   wal.colors.color2,
  "color3":   wal.colors.color3,
  "color4":   wal.colors.color4,
  "color5":   wal.colors.color5,
  "color6":   wal.colors.color6,
  "color7":   wal.colors.color7,
  "color8":   wal.colors.color8,
  "color9":   wal.colors.color9,
  "color10":  wal.colors.color10,
  "color11":  wal.colors.color11,
  "color12":  wal.colors.color12,
  "color13":  wal.colors.color13,
  "color14":  wal.colors.color14,
  "color15":  wal.colors.color15,
}

// Deliberatly pollute the global namespace so we can
// use "red" as a shortcut to colors.red
Object.keys(colors).forEach(k => {
  global[k] = colors[k];
});

const colorMapping = {
  'colors.completion.fg': `'["${foreground}","${foreground}","${foreground}"]'`,
  'colors.completion.odd.bg': `'${background}'`,
  'colors.completion.even.bg': `'${background}'`,
  'colors.completion.category.fg': `'${foreground}'`,
  'colors.completion.category.bg': `'${background}'`,
  'colors.completion.category.border.top': `'${background}'`,
  'colors.completion.category.border.bottom': `'${background}'`,
  'colors.completion.item.selected.fg': `'${foreground}'`,
  'colors.completion.item.selected.bg': `'${yellow}'`,
  'colors.completion.item.selected.border.top': `'${yellow}'`,
  'colors.completion.item.selected.border.bottom': `'${yellow}'`,
  'colors.completion.match.fg': `'${red}'`,
  'colors.completion.scrollbar.fg': `'${white}'`,
  'colors.completion.scrollbar.bg': `'${background}'`,
  'colors.downloads.bar.bg': `'${black}'`,
  'colors.downloads.start.fg': `'${white}'`,
  'colors.downloads.start.bg': `'${blue}'`,
  'colors.downloads.stop.fg': `'${white}'`,
  'colors.downloads.stop.bg': `'${blue}'`,
  'colors.downloads.error.fg': `'${white}'`,
  'colors.downloads.error.bg': `'${red}'`,
  'colors.hints.fg': `'${foreground}'`,
  'colors.hints.bg': `'${background}'`,
  'colors.hints.match.fg': `'${green}'`,
  'colors.keyhint.fg': `'${white}'`,
  'colors.keyhint.suffix.fg': `'${yellow}'`,
  'colors.keyhint.bg': `${((color) => {
    const rgb = hexToRgb(''+color);

    return `'rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 80%)'`;
  })(''+background)}`,
  'colors.messages.error.fg': `'${white}'`,
  'colors.messages.error.bg': `'${red}'`,
  'colors.messages.error.border': `'${red}'`,
  'colors.messages.warning.fg': `'${white}'`,
  'colors.messages.warning.bg': `'${yellow}'`,
  'colors.messages.warning.border': `'${yellow}'`,
  'colors.messages.info.fg': `'${white}'`,
  'colors.messages.info.bg': `'${foreground}'`,
  'colors.messages.info.border': `'${foreground}'`,
  'colors.prompts.bg': `'${background}'`,
  'colors.prompts.selected.bg': `'${grey}'`,
  'colors.statusbar.normal.fg': `'${foreground}'`,
  'colors.statusbar.normal.bg': `'${background}'`,
  'colors.statusbar.insert.fg': `'${foreground}'`,
  'colors.statusbar.insert.bg': `'${background}'`,
  'colors.statusbar.passthrough.fg': `'${white}'`,
  'colors.statusbar.passthrough.bg': `'${blue}'`,
  'colors.statusbar.private.fg': `'${foreground}'`,
  'colors.statusbar.private.bg': `'${background}'`,
  'colors.statusbar.command.fg': `'${foreground}'`,
  'colors.statusbar.command.bg': `'${background}'`,
  'colors.statusbar.command.private.fg': `'${foreground}'`,
  'colors.statusbar.command.private.bg': `'${background}'`,
  'colors.statusbar.caret.fg': `'${foreground}'`,
  'colors.statusbar.caret.bg': `'${magenta}'`,
  'colors.statusbar.caret.selection.fg': `'${foreground}'`,
  'colors.statusbar.caret.selection.bg': `'${magenta}'`,
  'colors.statusbar.progress.bg': `'${white}'`,
  'colors.statusbar.url.fg': `'${white}'`,
  'colors.statusbar.url.error.fg': `'${red}'`,
  'colors.statusbar.url.hover.fg': `'${cyan}'`,
  'colors.statusbar.url.success.http.fg ': `'${white}'`,
  'colors.statusbar.url.success.https.fg ': `'${green}'`,
  'colors.statusbar.url.warn.fg': `'${yellow}'`,
  'colors.tabs.bar.bg': `'${background}'`,
  'colors.tabs.indicator.start': `'${blue}'`,
  'colors.tabs.indicator.stop': `'${green}'`,
  'colors.tabs.indicator.error': `'${red}'`,
  'colors.tabs.odd.fg': `'${white}'`,
  'colors.tabs.odd.bg': `'${grey}'`,
  'colors.tabs.even.fg': `'${white}'`,
  'colors.tabs.even.bg': `'${grey}'`,
  'colors.tabs.selected.odd.fg': `'${white}'`,
  'colors.tabs.selected.odd.bg': `'${black}'`,
  'colors.tabs.selected.even.fg': `'${white}'`,
  'colors.tabs.selected.even.bg': `'${black}'`,
  'colors.webpage.bg': `'${white}'`,
}

Object.keys(colorMapping).forEach(color => {
  qutejs.set(color, colorMapping[color]);
});
