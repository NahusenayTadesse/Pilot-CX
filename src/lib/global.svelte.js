
export let btnAll = `font-Inter lg:text-[21px] text-[18px] lg:px-[24px] px-[16px] lg:py-[16px] py-[12px] rounded-[16px] transition-all duration-300 ease-in-out hover:scale-110`;

export let btnFilled = `bg-light-blue-4 text-dark-1 border-2 border-transparent  ${btnAll}`;

export let btnHallow = `bg-transparent text-light-blue-4 border-2 border-light-blue-4 ${btnAll}`;

export let btnWhiteFilled = `bg-white text-light-blue-4 border-2 border-transparent ${btnAll}`;

export let btnWhiteHallow = `bg-transparent text-white border-2 border-white ${btnAll}`;
export let disabled = `bg-gray-400 text-gray-700 cursor-not-allowed opacity-50 px-4 py-2 rounded ${btnAll}`
// typewriter.js
import { quintInOut} from 'svelte/easing';

export function typewriter(
 node,
  { speed = 50, easing = quintInOut } = {}
) {
const text = node.textContent;
  const duration = text.length / (speed / 1000);

  return {
    duration,
  easing,
    tick: (t) => {
               // optionally use it yourself
      const i = Math.trunc(text.length * t);
      node.textContent = text.slice(0, i);
    }
  };
}


