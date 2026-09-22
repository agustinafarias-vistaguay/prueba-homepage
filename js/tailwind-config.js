tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            "colors": {
                "primary": "#47C278",
                "primary-container": "#47C278",
                "on-primary": "#ffffff",
                "on-primary-container": "#004b26",
                "background": "#fafafa",
                "on-background": "#1a1c1c",
                "surface": "#ffffff",
                "on-surface": "#1a1c1c",
                "on-surface-variant": "#3e4a3f",
                "outline": "#6d7a6f",
                "outline-variant": "#bdcabc",
                "surface-container-lowest": "#ffffff",
                "surface-container-low": "#f3f3f3",
                "surface-container": "#eeeeee",
                "surface-container-high": "#e8e8e8",
                "surface-container-highest": "#e2e2e2",
                "inverse-surface": "#2f3131",
                "surface-variant": "#e2e2e2"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "8px",
                "xl": "12px",
                "full": "9999px"
            },
            "spacing": {
                "4.5": "18px",
                "1.8": "7.2px",
                "stack-sm": "8px",
                "section-padding": "80px",
                "gutter": "24px",
                "margin-mobile": "16px",
                "stack-lg": "32px",
                "container-max": "1360px",
                "stack-md": "16px"
            },
            "fontFamily": {
                "headline-md": ["Plus Jakarta Sans"],
                "label-sm": ["Plus Jakarta Sans"],
                "display-lg": ["Plus Jakarta Sans"],
                "headline-lg-mobile": ["Plus Jakarta Sans"],
                "headline-lg": ["Plus Jakarta Sans"],
                "body-md": ["Plus Jakarta Sans"],
                "stat-xl": ["Plus Jakarta Sans"]
            },
            "fontSize": {
                "headline-md": ["22px", { "lineHeight": "1.3", "fontWeight": "700" }],
                "label-sm": ["13px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600" }],
                "display-lg": ["56px", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "800" }],
                "headline-lg-mobile": ["28px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                "headline-lg": ["36px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                "body-md": ["15px", { "lineHeight": "1.5", "fontWeight": "400" }],
                "stat-xl": ["40px", { "lineHeight": "1", "fontWeight": "800" }]
            }
        }
    }
};