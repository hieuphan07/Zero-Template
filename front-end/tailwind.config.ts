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
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)',
  			},
  			warning: {
  				DEFAULT: 'var(--warning)',
  				foreground: 'var(--warning-foreground)',
  			},
  			success: {
  				DEFAULT: 'var(--success)',
  				foreground: 'var(--success-foreground)'
  			},
  			danger: {
  				DEFAULT: 'var(--danger)',
  				foreground: 'var(--danger-foreground)'
  			},
			info: {
				DEFAULT: 'var(--info)',
				foreground: 'var(--info-foreground)'
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
} satisfies Config;
