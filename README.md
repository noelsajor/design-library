# Citriom Design System Migration Test

This project is a technical test for Citriom, focused on migrating our current design system library from Figma to a new source that enables faster iterations for the design team.

## Project Summary
The goal of this test is to evaluate how we can rebuild and maintain our design system in a React + TypeScript environment, making it easier for designers and developers to collaborate and iterate quickly. By moving away from a Figma-only workflow, we can:
- Rapidly prototype and test UI components in code
- Reuse and compose components for new features
- Ensure visual and functional consistency across products
- Empower the design team to deliver and validate changes faster

## Process Overview
1. **Design Language Extraction:**
   - We started by extracting the core design tokens (COLORS, TYPOGRAPHY, SPACING) from Figma and codifying them in the project.
2. **Component Creation:**
   - Built foundational components: `Button`, `ActionButton`, `ButtonGroup`, `Card`, and `WarningMessageModal`.
   - Each component is designed to be flexible, reusable, and visually consistent, using the shared design tokens.
3. **Showcase & Demo:**
   - Created a demo page that displays all component variants, states, and responsive layouts.
   - Added a responsive grid layout (`LayoutGrid`) and a horizontal button row (`ButtonRow`) for layout flexibility.
4. **Refactor & Polish:**
   - Extracted shared logic and constants for maintainability.
   - Ensured all components are responsive and accessible.

## Components Implemented
- **Button:** Multiple variants (default, hot, danger, disabled), sizes, and states.
- **ActionButton:** Icon-based button with variants and sizes.
- **ButtonGroup:** Grouped buttons with correct border and icon layout.
- **Card:** Generic, responsive card with title, content, media, and footer.
- **WarningMessageModal:** Accessible modal for warnings and confirmations.
- **LayoutGrid:** Responsive grid for arranging cards or other components.
- **ButtonRow:** Responsive horizontal row for quick button layouts.

## Why This Approach?
By building a robust set of reusable components, we:
- Reduce design and development time for new features
- Minimize inconsistencies and rework
- Enable the design team to iterate in code, not just in Figma
- Lay the groundwork for a scalable, maintainable design system

---

This repository is part of Citriom's ongoing effort to modernize and accelerate our design system processes. For questions or feedback, please contact the design system team.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
