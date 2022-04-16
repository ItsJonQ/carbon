import createEmotion from '@emotion/css/create-instance';

// {
//   cache,
//   css,
//   cx,
//   flush,
//   getRegisteredStyles,
//   hydrate,
//   injectGlobal,
//   keyframes,
//   merge,
//   sheet,
// }
const customEmotionInstance = createEmotion({ key: 'atm' });

/**
 * Compiling CSS with Carbon's custom Emotion instance.
 */
export const css = customEmotionInstance.css;

/**
 * Combining CSS classes with Carbon's custom Emotion instance.
 */
export const cx = customEmotionInstance.cx;

/**
 * Injecting global styles with Carbon's custom Emotion instance.
 */
export const injectGlobal = customEmotionInstance.injectGlobal;

/**
 * Style cache with Carbon's custom Emotion instance.
 */
export const cache = customEmotionInstance.cache;

/**
 * Flushing the style cache with Carbon's custom Emotion instance.
 */
export const flush = customEmotionInstance.flush;
