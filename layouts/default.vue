<template>
  <div id="default">
    <div>
      <c-navigation />
      <div class="content"><slot /></div>
    </div>

    <c-footer />
  </div>
</template>

<style lang="css">
.content {
  padding: 0 2rem;
}
</style>
