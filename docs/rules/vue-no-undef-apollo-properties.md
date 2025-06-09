# @khulnasoft/vue-no-undef-apollo-properties

Require Apollo query properties to be initialized in component data.

Sensible initial values for Apollo queries should be defined in component data.
This reduces the likelihood of unexpected behaviour, especially when running
under @vue/compat.

This rule does not detect whether the initial value is of the correct type.

## Rule Details

### Examples of **incorrect** code for this rule

```html
<script>
  export default {
    data() {
      return {
        foo: '',
        qux: undefined,
      };
    },
    apollo: {
      $subscribe: {
        foo: {
          // ...
        },
        bar: {
          // This isn't defined in data.
          // ...
        },
      },
      qux: {
        // ...
      },
      bbq: {
        // This isn't defined in data.
        // ...
      },
    },
    render(h) {
      return h();
    },
  };
</script>
```

### Examples of **correct** code for this rule

```html
<script>
  export default {
    data() {
      return {
        foo: '',
        qux: undefined,
        bar: null,
        bbq: [],
      };
    },
    apollo: {
      $subscribe: {
        foo: {
          // ...
        },
        bar: {
          // ...
        },
      },
      qux: {
        // ...
      },
      bbq: {
        // ...
      },
    },
    render(h) {
      return h();
    },
  };
</script>
```

## Options

Nothing

## Related rules

Nothing

## When Not To Use It

If you don't use VueApollo with the Options API, don't use this rule.
