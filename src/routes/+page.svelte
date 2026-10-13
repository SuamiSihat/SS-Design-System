<script>
  import HomeHero from '$lib/components/home/HomeHero.svelte';
  import TaskTiles from '$lib/components/home/TaskTiles.svelte';
  import MainBrands from '$lib/components/home/MainBrands.svelte';
  import FiveRules from '$lib/components/home/FiveRules.svelte';
  import ProductBrands from '$lib/components/home/ProductBrands.svelte';
  import DesignerBand from '$lib/components/home/DesignerBand.svelte';
</script>

<svelte:head>
  <title>SuamiSihat® Brand Hub — logos, colours and brand guides</title>
</svelte:head>

<HomeHero />

<main id="main-content" style="position: relative; z-index: 1;">
  <TaskTiles />
  <MainBrands />
  <FiveRules />
  <ProductBrands />
  <DesignerBand />
</main>
