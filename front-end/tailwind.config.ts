import type { Config } from "tailwindcss";

module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			background: 'var(--background)',
			foreground: 'var(--foreground)',
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)',
  				500: 'var(--primary-500)',
  				foreground500: 'var(--primary-foreground-500)',
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)',
  				500: 'var(--secondary-500)',
  				foreground500: 'var(--secondary-foreground-500)',
  			},
  			warning: {
  				DEFAULT: 'var(--warning)',
  				foreground: 'var(--warning-foreground)',
  				500: 'var(--warning-500)',
  				foreground500: 'var(--warning-foreground-500)',
  			},
  			success: {
  				DEFAULT: 'var(--success)',
  				foreground: 'var(--success-foreground)',
  				500: 'var(--success-500)',
  				foreground500: 'var(--success-foreground-500)',
  			},
  			danger: {
  				DEFAULT: 'var(--danger)',
  				foreground: 'var(--danger-foreground)',
  				500: 'var(--danger-500)',
  				foreground500: 'var(--danger-foreground-500)',
  			},
			info: {
				DEFAULT: 'var(--info)',
				foreground: 'var(--info-foreground)',
  				500: 'var(--info-500)',
  				foreground500: 'var(--info-foreground-500)',
			},
			light: {
				DEFAULT: 'var(--light)',
				foreground: 'var(--light-foreground)'
			},
			dark: {
				DEFAULT: 'var(--dark)',
				foreground: 'var(--dark-foreground)'
			}
  		},
  	}
  },
  safelist: [
	// primary
    'bg-primary-500','text-primary-foreground500','bg-primary','hover:bg-primary','focus-within:border-primary','hover:border-primary','accent-primary','text-primary','text-primary-foreground','focus:ring-primary','hover:text-primary-foreground','border','border-primary','hover:text-primary',
	// secondary
	'bg-secondary-500','text-secondary-foreground500','bg-secondary','hover:bg-secondary','focus-within:border-secondary','hover:border-secondary','accent-secondary','text-secondary','text-secondary-foreground','focus:ring-secondary','hover:text-secondary-foreground','border','border-secondary','hover:text-secondary',
	// warning
	'bg-warning-500','text-warning-foreground500','bg-warning','hover:bg-warning','focus-within:border-warning','hover:border-warning','accent-warning','text-warning','text-warning-foreground','focus:ring-warning','hover:text-warning-foreground','border','border-warning','hover:text-warning',
	// success
	'bg-success-500','text-success-foreground500','bg-success','hover:bg-success','focus-within:border-success','hover:border-success','accent-success','text-success','text-success-foreground','focus:ring-success','hover:text-success-foreground','border','border-success','hover:text-success',
	// danger
    'bg-danger-500','text-danger-foreground500','bg-danger','hover:bg-danger','focus-within:border-danger','hover:border-danger','accent-danger','text-danger','text-danger-foreground','focus:ring-danger','hover:text-danger-foreground','border','border-danger','hover:text-danger',
	// info
	'bg-info-500','text-info-foreground500','bg-info','hover:bg-info','focus-within:border-info','hover:border-info','accent-info','text-info','text-info-foreground','focus:ring-info','hover:text-info-foreground','border','border-info','hover:text-info',
	// light
	'bg-light','bg-light','hover:bg-light','focus-within:border-light','hover:border-light','accent-light','text-light','text-light-foreground','focus:ring-light','hover:text-light-foreground','border','border-light','hover:text-light',
	// dark
	'bg-dark','hover:bg-dark','focus-within:border-dark','hover:border-dark','accent-dark','text-dark','text-dark-foreground','focus:ring-dark','hover:text-dark-foreground','border','border-dark','hover:text-dark',
  ]
} satisfies Config;
