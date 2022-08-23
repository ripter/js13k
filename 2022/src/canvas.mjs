window.ctx = window.c.getContext('2d');

export const ctx = window.ctx;
export const width = window.c.width;
export const height = window.c.height

export const clearScreen = () => ctx.clearRect(0, 0, width, height);