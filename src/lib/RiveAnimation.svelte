<script lang="ts">
  import { browser } from '$app/environment';
 import {onMount} from 'svelte';

  let { src, riveInstance } = $props();
  let canvas: HTMLCanvasElement | null = $state();

	onMount(async () => {
    const { Rive, Layout, Fit, Alignment } = browser ? await import('@rive-app/canvas') : {};
		riveInstance = new Rive({
			src,
			autoplay: true,
      loop: true,
			layout: new Layout({
				fit: Fit.Contain,
				alignment: Alignment.Center,
			}),
			canvas,
			onLoad: () => {
				riveInstance.resizeDrawingSurfaceToCanvas();
			},
      
		});
	});

   let toggle = $state(true);

  function pauseandPlay() {
    if (riveInstance) {
      if (riveInstance.play()) {
        riveInstance.pause();
      } else {
        riveInstance.play();
      }
    }
  } 

  function pause() {
     riveInstance.pause();
  }
    function play() {
     riveInstance.play();
  }
 

</script>

<div >
  <canvas bind:this={canvas} ></canvas> 

</div>

<style>
  canvas {
    width: 100%;
    height: 100%;
  }
  </style>