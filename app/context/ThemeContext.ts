// ThemeContext.tsx
import { createContext } from "react";

// type ThemeContextType = {
//   theme: string;
//   toggleTheme: () => void;
// };

// Create the context with the type
const ThemeContext = createContext<string | undefined>(undefined);

export default ThemeContext;
