<template>
    <div
      :class="alertClass"
      role="alert"
      data-slot="alert"
      v-bind="$attrs"
    >
      <slot />
      <Button
        v-if="props.close"
        size="sm"
        variant="inverse"
        mode="icon"
        @click="handleClose"
        aria-label="Dismiss"
        data-alert-close="true"
        class="group shrink-0 size-4"
      >
  <Icon icon="lucide:x" class="opacity-60! group-hover:opacity-100! size-4!" />
      </Button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { cva } from 'class-variance-authority';

  import { cn } from '../../utils/cn';
  import { Icon } from '@iconify/vue';
  import {Button} from '../button';
  
  // -----------------------------------------------------------------------------
  // Prop Types
  // -----------------------------------------------------------------------------
  
  type Variant =
    | 'secondary'
    | 'primary'
    | 'destructive'
    | 'success'
    | 'info'
    | 'mono'
    | 'warning';
  
  type Appearance = 'solid' | 'outline' | 'light' | 'stroke';
  
  type Size = 'lg' | 'md' | 'sm';
  
  type IconVariant = 'primary' | 'destructive' | 'success' | 'info' | 'warning';
  
  // -----------------------------------------------------------------------------
  // Props / Emits
  // -----------------------------------------------------------------------------
  
  const props = defineProps<{
    variant?: Variant;
    icon?: IconVariant;
    appearance?: Appearance;
    size?: Size;
    close?: boolean;
  }>();
  
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
  
  function handleClose() {
    emit('close');
  }
  
  // -----------------------------------------------------------------------------
  // CVA Variant Map (identisch zur React‑Version)
  // -----------------------------------------------------------------------------
  
  const alertVariants = cva(
    'flex items-stretch w-full gap-2 group-[.toaster]:w-(--width)',
    {
      variants: {
        variant: {
          secondary: '',
          primary: '',
          destructive: '',
          success: '',
          info: '',
          mono: '',
          warning: '',
        },
        icon: {
          primary: '',
          destructive: '',
          success: '',
          info: '',
          warning: '',
        },
        appearance: {
          solid: '',
          outline: '',
          light: '',
          stroke: 'text-foreground',
        },
        size: {
        lg: 'rounded-lg p-4 gap-3 text-base [&>[data-slot=alert-icon]>svg]:size-6 *:data-slot=alert-icon:mt-0 *:data-slot=alert-close:mt-0.5 *:data-slot=alert-close:-me-0.5',
        md: 'rounded-lg p-3.5 gap-2.5 text-sm [&>[data-slot=alert-icon]>svg]:size-5 *:data-slot=alert-icon:mt-0 *:data-slot=alert-close:-me-0.5',
        sm: 'rounded-md px-3 py-2.5 gap-2 text-xs [&>[data-slot=alert-icon]>svg]:size-4 *:data-alert-icon:mt-0.5 *:data-slot=alert-close:-me-0.5 [&>[data-slot=alert-close]>svg]:size-3.5!',
      },
      },
      compoundVariants: [
        {
          variant: 'secondary',
          appearance: 'solid',
          class: 'bg-muted text-foreground *:data-alert-close:text-foreground',
        },
        {
          variant: 'primary',
          appearance: 'solid',
          class:
            'bg-primary text-primary-foreground *:data-alert-close:text-primary-foreground',
        },
        {
          variant: 'destructive',
          appearance: 'solid',
          class:
            'bg-destructive text-destructive-foreground *:data-alert-close:text-destructive-foreground',
        },
        {
          variant: 'success',
          appearance: 'solid',
          class: 'bg-green-500 text-white *:data-alert-close:text-white',
        },
        {
          variant: 'info',
          appearance: 'solid',
          class: 'bg-violet-600 text-white *:data-alert-close:text-white',
        },
        {
          variant: 'warning',
          appearance: 'solid',
          class: 'bg-yellow-500 text-white *:data-alert-close:text-white',
        },
        {
          variant: 'mono',
          appearance: 'solid',
          class:
            'bg-mono text-mono-foreground *:data-alert-close:text-mono-foreground',
        },
        {
          variant: 'secondary',
          appearance: 'outline',
          class:
            'border border-border bg-background text-foreground *:data-alert-close:text-foreground',
        },
        {
          variant: 'primary',
          appearance: 'outline',
          class:
            'border border-border bg-background text-primary *:data-alert-close:text-foreground',
        },
        {
          variant: 'destructive',
          appearance: 'outline',
          class:
            'border border-border bg-background text-destructive *:data-alert-close:text-foreground',
        },
        {
          variant: 'success',
          appearance: 'outline',
          class:
            'border border-border bg-background text-green-500 *:data-alert-close:text-foreground',
        },
        {
          variant: 'info',
          appearance: 'outline',
          class:
            'border border-border bg-background text-violet-600 *:data-alert-close:text-foreground',
        },
        {
          variant: 'warning',
          appearance: 'outline',
          class:
            'border border-border bg-background text-yellow-500 *:data-alert-close:text-foreground',
        },
        {
          variant: 'mono',
          appearance: 'outline',
          class:
            'border border-border bg-background text-mono *:data-alert-close:text-foreground',
        },
        {
          variant: 'secondary',
          appearance: 'stroke',
          class:
            'border border-border bg-background [&>div:first-of-type>svg]:text-foreground',
        },
        {
          variant: 'primary',
          appearance: 'stroke',
          class:
            'border border-border bg-background [&>div:first-of-type>svg]:text-primary',
        },
        {
          variant: 'destructive',
          appearance: 'stroke',
          class:
            'border border-border bg-background [&>div:first-of-type>svg]:text-destructive',
        },
        {
          variant: 'success',
          appearance: 'stroke',
          class:
            'border border-border bg-background [&>div:first-of-type>svg]:text-green-500',
        },
        {
          variant: 'info',
          appearance: 'stroke',
          class:
            'border border-border bg-background [&>div:first-of-type>svg]:text-violet-600',
        },
        {
          variant: 'warning',
          appearance: 'stroke',
          class:
            'border border-border bg-background [&>div:first-of-type>svg]:text-yellow-500',
        },
        {
          variant: 'mono',
          appearance: 'stroke',
          class:
            'border border-border bg-background [&>div:first-of-type>svg]:text-mono',
        },
        {
          variant: 'secondary',
          appearance: 'light',
          class: 'bg-muted border border-border text-foreground',
        },
        {
          variant: 'primary',
          appearance: 'light',
          class:
            'bg-primary/5 border border-primary/10 text-foreground [&>div:first-of-type>svg]:text-primary',
        },
        {
          variant: 'destructive',
          appearance: 'light',
          class:
            'bg-destructive/5 border border-destructive/10 text-foreground [&>div:first-of-type>svg]:text-destructive',
        },
        {
          variant: 'success',
          appearance: 'light',
          class:
            'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-950/50 text-foreground [&>div:first-of-type>svg]:text-green-500',
        },
        {
          variant: 'info',
          appearance: 'light',
          class:
            'bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-950/50 text-foreground [&>div:first-of-type>svg]:text-violet-600',
        },
        {
          variant: 'warning',
          appearance: 'light',
          class:
            'bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-950/50 text-foreground [&>div:first-of-type>svg]:text-yellow-500',
        },
        // Mono + Icon Color Variants
        {
          variant: 'mono',
          icon: 'primary',
          class: '[&>div:first-of-type>svg]:text-primary',
        },
        {
          variant: 'mono',
          icon: 'warning',
          class: '[&>div:first-of-type>svg]:text-yellow-500',
        },
        {
          variant: 'mono',
          icon: 'success',
          class: '[&>div:first-of-type>svg]:text-green-500',
        },
        {
          variant: 'mono',
          icon: 'destructive',
          class: '[&>div:first-of-type>svg]:text-destructive',
        },
        {
          variant: 'mono',
          icon: 'info',
          class: '[&>div:first-of-type>svg]:text-violet-600',
        },
      ],
      defaultVariants: {
        variant: 'secondary',
        appearance: 'solid',
        size: 'md',
      },
    }
  );
  
  // -----------------------------------------------------------------------------
  // Computed Classstring
  // -----------------------------------------------------------------------------
  
  const alertClass = computed(() =>
    cn(
      alertVariants({
        variant: props.variant,
        icon: props.icon,
        appearance: props.appearance,
        size: props.size,
      })
    )
  );
  </script>
  