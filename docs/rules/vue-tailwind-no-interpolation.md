# @khulnasoft/vue-tailwind-no-interpolation

This rule enforces the same conventions as [tailwind-no-interpolation](./tailwind-no-interpolation.md) in Vue templates.

## Rule Details

### Examples of **incorrect** code for this rule

```html
<!-- Using interpolation to build a utility in a string literal -->
<template>
  <span :class="'gl-bg-red-' + color"></span>
</template>

<!-- Using interpolation to build a utility in a template literal -->
<template>
  <span :class="`gl-border-top gl-bg-red-${color} gl-text-gray-400`"></span>
</template>
  ```

### Examples of **correct** code for this rule

```html
<!-- Utilities declared as a string literal without interpolation -->
<template>
  <span class="gl-bg-red-800"></span>
</template>

<!-- Utilities declared as a template literal without interpolation -->
<template>
  <span :class="`gl-bg-red-800`"></span>
</template>
```

## Options

No options.

## Related rules

- [tailwind-no-interpolation](./tailwind-no-interpolation.md)

## When Not To Use It

If the codebase doesn't leverage Tailwind CSS, keep this rule disabled.
