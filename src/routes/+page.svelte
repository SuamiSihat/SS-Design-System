<script>
  import HomeHero from '$lib/components/home/HomeHero.svelte';
  import StorySection from '$lib/components/home/StorySection.svelte';
  import ArchitectureSection from '$lib/components/home/ArchitectureSection.svelte';
  import CaseStudySection from '$lib/components/home/CaseStudySection.svelte';
  import RolesSection from '$lib/components/home/RolesSection.svelte';
  import StudiosSection from '$lib/components/home/StudiosSection.svelte';
  import ToolsSection from '$lib/components/home/ToolsSection.svelte';

  let copyFeedback = $state('');

  // Copy helper
  function copyToClipboard(text, message) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      copyFeedback = message || `Copied ${text}!`;
      setTimeout(() => { copyFeedback = ''; }, 2200);
    }
  }
</script>

<svelte:head>
  <title>SuamiSihat® Design System — Single Source of Truth</title>
</svelte:head>

<!-- Global Toast Notification for One-Click Copied Actions -->
{#if copyFeedback}
  <div class="f-live-toast" role="status" aria-live="polite">
    <iconify-icon icon="fluent:checkmark-circle-24-filled" class="f-toast-icon"></iconify-icon>
    <span>{copyFeedback}</span>
  </div>
{/if}

<HomeHero />

<main id="main-content" style="position: relative; z-index: 1;">
  <StorySection />
  <ArchitectureSection />
  <CaseStudySection />
  <RolesSection />
  <StudiosSection copy={copyToClipboard} />
  <ToolsSection copy={copyToClipboard} />
</main>

<style>
  /* Live Toast */
  .f-live-toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 9999px;
    background: #022057;
    color: #FFFFFF;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
    animation: f-toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  :global([data-theme="dark"]) .f-live-toast {
    background: #21A1F7;
    color: #000000;
  }

  .f-toast-icon {
    font-size: 1.1rem;
    color: var(--color-success-fg);
  }

  :global([data-theme="dark"]) .f-toast-icon {
    color: #000000;
  }

  @keyframes f-toast-in {
    from { opacity: 0; transform: translateY(16px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
